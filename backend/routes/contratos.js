const router = require('express').Router();
const Contract= require('../models/Contract')
const Client = require('../models/Client')

router.get('/',async (req,res)=>{
        const contratos= await Contract.find()
        res.status(200).json({contratos})
    })
    .post('/crea',async(req,res)=>{
        const {idCliente,monto,plazo,tasa,fechaInicio,diaPago} =req.body
        const tabla= creaTabla(monto,plazo,tasa,fechaInicio,diaPago)
        const cliente= await Client.findOne({_id:idCliente})
        const numeroContrato=`${cliente.numCliente}-CS-${cliente.numContratos+1}`
        cliente.numContratos+=1
        cliente.save()
        const contrato= await Contract.create({monto,plazo,tasa,
            numeroContrato,tablaOriginal:tabla,tablaActual:tabla,
            fechaInicio,diaPago,cliente:idCliente})
        res.status(201).json({ contrato })
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
        detalle.ivaInteres=detalle.interes*IvaRegimen
        detalle.capital=Mensualidad-detalle.interes-detalle.ivaInteres
        detalle.saldoFinal=saldoinicial-detalle.capital
        saldoinicial=detalle.saldoFinal
        tabla.push(detalle)
    }
    return tabla
}
module.exports = router;