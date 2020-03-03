const router = require('express').Router();
const Client = require('../models/Client')

router.get('/',async (req,res)=>{
        const clientes= await Client.find().sort({createdAt:-1})
        res.status(200).json({clientes})
    })
    .post('/crea',async (req,res)=>{
        const {nombre,apellidoPaterno,apellidoMaterno,rfc,curp,genero,numCliente}=req.body
        const cliente= await Client.create({nombre,apellidoPaterno,apellidoMaterno,numCliente,rfc,curp,genero})
        res.status(201).json({cliente})
    })
    .delete('/borra/:id',async (req,res)=>{
        const {id}=req.params
        await Client.findByIdAndDelete(id)
        res.status(200).json({msg:"Cliente borrado."})
      })
    .patch('/edita/:id', async (req,res)=>{
        const {monto,plazo,tasa,diaPago,estatus}=req.body
        const {id}=req.params
        const client= await Client.findByIdAndUpdate(id,{monto,plazo,tasa,diaPago,estatus,tablaOriginal:tabla,tablaActual:tabla,},{new:true})
          .catch(err=>res.status(500).json(err))
        res.status(200).json({client})
      })
    
module.exports= router