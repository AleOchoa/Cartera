const { Schema, model } = require('mongoose');
const PLM = require('passport-local-mongoose');

const userSchema = new Schema(
  {
    email: String,
    name: String,
    rol:{
      type:String,
      enum:['Admin','Mesa'],
      default:'Mesa'
    },
    token:String,
    estatus:{
      type:String,
      enum:['Active','Inactive','Blocked'],
      default:'Inactive'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.plugin(PLM, { usernameField: 'email' });

module.exports = model('User', userSchema);
