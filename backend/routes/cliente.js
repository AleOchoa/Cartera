const router = require('express').Router();
const Client = require('../models/Client')

router.get('/',async (req,res)=>{
        const clientes= await Client.find()
        res.status(200).json({clientes})
    })
    .post('/crea',async (req,res)=>{
        const {nombre,apellidoPaterno,apellidoMaterno,numCliente}=req.body
        const cliente= await Client.create({nombre,apellidoPaterno,apellidoMaterno,numCliente})
        res.status(201).json({cliente})
    })
    
module.exports= router