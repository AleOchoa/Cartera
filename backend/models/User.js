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
    isActive:{
      type:Boolean,
      default:true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.plugin(PLM, { usernameField: 'email' });

module.exports = model('User', userSchema);
