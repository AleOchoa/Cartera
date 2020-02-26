require('dotenv').config()

const fs = require('fs')
const path = require('path')
const hbs = require('hbs')
const nodemailer = require('nodemailer')

const welcomeTemplate = hbs.compile(
  fs.readFileSync((__dirname, 'views/correo.hbs'), 'utf8')
)

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth:{
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD
  }
})

exports.confirmAccount = async (to,key,name) => {
  obj={email:to,password:key,name:name}
    return await transporter.sendMail({
      from: "'Emisha' <contacto@emisha.com>",
      to,
      subject: 'Bienvenido a Emisha',
      html: welcomeTemplate({obj})
    })
}