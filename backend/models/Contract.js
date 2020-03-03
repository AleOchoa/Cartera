const { Schema, model } = require('mongoose');

const contractSchema = new Schema(
  {
    monto:Number,
    plazo:Number,
    tasa:Number,
    numeroContrato:{
      type:String,
      unique:true
    },
    tablaOriginal:Array,
    tablaActual:Array,
    cliente:{
      type: Schema.Types.ObjectId,
      ref: 'Client'
    },
    fechaInicio:Date,
    fechaPrimerPago:Date,
    diaPago:Number,
    estatus:{
      type:String,
      enum:["Activo","Terminado","Quebranto","Dación","Siniestro"],
      default:"Activo"
    },
    mensualidad:Number
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = model('Contract', contractSchema);