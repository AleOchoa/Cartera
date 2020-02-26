const router = require('express').Router();
const Contract= require('../models/Contract')
const Client = require('../models/Client')

router.get('/contratos',async (req,res)=>{
        const contratos= await Contract.find()
        res.status(200).json({contratos})
    })
    .post('/creaContrato',async(req,res)=>{
        const {idCliente,monto,plazo,tasa,fechaInicio} =req.body
        const tabla= creaTabla(monto,plazo,tasa,fechaInicio)
        const cliente= await Client.findOne({_id:idCliente})
        const numeroContrato=`${cliente.numCliente}-CS-${cliente.numContratos+1}`
        cliente.numContratos+=1
        cliente.save()
        const contrato= await Contract.create({monto,plazo,tasa,
            numeroContrato,tabla,fechaInicio,
            cliente:idCliente})
        res.status(201).json({ contrato })
    })

function creaTabla(monto,plazo,tasa,fechaInicio){
    const residual=0 //por el momento el residual siempre será cero
    const PeriodicidadPlan=12 //periodos por año: 12 meses
    const IvaRegimen=.16 //por el momento todas son PF
    const Mensualidad=Math.round(100*((monto-(residual*(1/Math.pow(1+((1+IvaRegimen)*((tasa/100)/PeriodicidadPlan)),plazo))))/((1-(1/Math.pow(1+((1+IvaRegimen)*((tasa/100)/PeriodicidadPlan)),plazo)))/((1+IvaRegimen)*((tasa/100)/PeriodicidadPlan)))))/100
    let saldoinicial=monto
    let tabla=[]
    const fechaini=new Date(fechaInicio)
    for (let i=1;i<=plazo;i++) {
        let fecha=fechaini.setMonth(fechaini.getMonth()+i);
        fecha=`${fecha.get}`
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