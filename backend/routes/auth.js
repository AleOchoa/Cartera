const router = require('express').Router();
const User = require('../models/User');
const passport = require('../config/passport');
const {confirmAccount}=require('../config/nodemailer')

router.post('/signup', async (req, res, next) => {
  const {name,email}=req.body
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let password = '';
  for (let i = 0; i < 10; i++) {
    password += characters[Math.floor(Math.random() * characters.length )];
  }
  let token = '';
  for (let i = 0; i < 20; i++) {
    token += characters[Math.floor(Math.random() * characters.length )];
  }
   await User.register({name,email,token}, password)
    .then(async (user) =>{ 
      const endpoint = `https://localhost:3001/${token}`
      await confirmAccount(email,password,name).catch(err=>console.log(err)
      )
      res.status(201).json({ user })})
    .catch((err) => res.status(500).json({ err }));
});

router.post('/changePassword',async(req,res)=>{
const {newPassword}=req.body
const {email}=req.user;
await User.findByUsername(email).then(async (changeUser)=>{
  if (changeUser){
      await changeUser.setPassword(newPassword)
      .then(user=>{
        changeUser.save();
        res.status(200).json({msg:'Contraseña cambiada exitosamente'})})
      .catch(err=>res.status(500).json({msg:'La contraseña no se pudo cambiar'}));
  } else {
      res.status(500).json({msg: 'El usuario no existe'});
  }
})
})
router.post('/login', passport.authenticate('local'), (req, res, next) => {
  const { user } = req;
  res.status(200).json({ user });
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ msg: 'Logged out' });
});

router.get('/profile', isAuth, (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(500).json({ err }));
});

function isAuth(req, res, next) {
  req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
}

module.exports = router;
