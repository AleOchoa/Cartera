const router = require('express').Router();
const Contract= require('../models/Contract')
const Client = require('../models/Client')

router.get('/',async (req,res)=>{
        const contratos= await Contract.find().populate('cliente').sort({createdAt:-1})
        res.status(200).json({contratos})
    })
    .get('/:id',async(req,res)=>{
        const contrato= await Contract.findById(id).populate('cliente')
        res.status(200).json({contrato})
    })
    .post('/crea',async(req,res)=>{
        const {idcliente,monto,plazo,tasa,fechaInicio,diaPago}=req.body
        const tabla= creaTabla(monto,plazo,tasa,fechaInicio,diaPago)
        const cliente= await Client.findOne({_id:idcliente})
        const numeroContrato=`${cliente.numCliente}-CS-${cliente.numContratos+1}`
        cliente.numContratos+=1
        cliente.save()
        const contrato= await Contract.create({monto,plazo,tasa,
            numeroContrato,tablaOriginal:tabla,tablaActual:tabla,
            fechaInicio,diaPago,cliente:idcliente,mensualidad:tabla[0].mensualidad,fechaPrimerPago:tabla[0].fechaExigibilidad})
        res.status(201).json({ contrato })
    })
    .delete('/borra/:id',async (req,res)=>{
        const {id}=req.params
        await Contract.findByIdAndDelete(id)
        res.status(200).json({msg:"Contrato borrado."})
      })
      
    .patch('/edita/:id', async (req,res)=>{
        const {monto,plazo,tasa,diaPago,estatus}=req.body
        const {id}=req.params
        const contrato= await Contract.findById(id)
        const fecha=contrato.fechaInicio.toISOString().substring(0,10)
        const tabla= creaTabla(monto,plazo,tasa,fecha,diaPago)
        const contract= await Contract.findByIdAndUpdate(id,{monto,plazo,tasa,diaPago,estatus,tablaOriginal:tabla,tablaActual:tabla,mensualidad:tabla[0].mensualidad,fechaPrimerPago:tabla[0].fechaExigibilidad},{new:true})
          .catch(err=>res.status(500).json(err))
        res.status(200).json({contract})
      })

function creaTabla(monto,plazo,tasa,fechaInicio,diaPago){
    const residual=0 //por el momento el residual siempre será cero
    const PeriodicidadPlan=12 //periodos por año: 12 monthes
    const IvaRegimen=.16 //por el momento todas son PF
    const Mensualidad=Math.round(100*((monto-(residual*(1/Math.pow(1+((1+IvaRegimen)*((tasa/100)/PeriodicidadPlan)),plazo))))/((1-(1/Math.pow(1+((1+IvaRegimen)*((tasa/100)/PeriodicidadPlan)),plazo)))/((1+IvaRegimen)*((tasa/100)/PeriodicidadPlan)))))/100
    let saldoinicial=monto
    let tabla=[]
    const fechaini=fechaInicio.split('-')
    if (diaPago<10) diaPago='0'+diaPago
    for (let i=1;i<=plazo;i++) {
        let year=fechaini[0]*1+Math.floor((i-1+fechaini[1]*1)/12)
        let month= fechaini[1]*1+((i%12))
        if (month==13) month=1
        if (month<10) month='0'+month
        let fecha=`${year}-${month}-${diaPago}`;
        let detalle={
            pago:i,
            saldoInicial:saldoinicial,
            fechaExigibilidad:fecha,
            interes:Math.round(100*saldoinicial*((tasa/100)/PeriodicidadPlan))/100,
            mensualidad:Mensualidad
        }
        detalle.ivaInteres=Math.round(detalle.interes*IvaRegimen*100)/100
        detalle.capital=Math.round((Mensualidad-detalle.interes-detalle.ivaInteres)*100)/100
        detalle.saldoFinal=Math.round((saldoinicial-detalle.capital)*100)/100
        saldoinicial=detalle.saldoFinal
        tabla.push(detalle)
    }
    return tabla
}
module.exports = router;