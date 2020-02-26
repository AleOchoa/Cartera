const { Schema, model } = require('mongoose');

const clientSchema = new Schema(
  {
    nombre:String,
    apellidoPaterno:String,
    apellidoMaterno:String,
    numContratos:{
        type:Number,
        default:0
    },
    numCliente:String,
    calificacion:{
        type:String,
        default:"NUEVO",
        enum:["NUEVO","DEUDOR","PAGADOR"]
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = model('Client', clientSchema);