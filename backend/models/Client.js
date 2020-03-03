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
    RFC:String,
    fechaNacimiento:Date,
    genero:{
      type:String,
      enum:["Masculino","Femenino","Indefinido"]
    },
    CURP:String,
    direccion:{
      calle:String,
      ext:String,
      int:String,
      colonia:String,
      delegacion:String,
      ciudad:String,
      estado:String,
      cp:String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = model('Client', clientSchema);