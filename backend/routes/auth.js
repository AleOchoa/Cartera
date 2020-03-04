const router = require('express').Router();
const User = require('../models/User');
const passport = require('../config/passport');
const {confirmAccount}=require('../config/nodemailer')

router.get('/usuarios',async(req,res)=>{
  const users=await User.find().sort({createdAt:-1})
  res.status(200).json({users})
})
router.delete('/borraUsuario/:id',async (req,res)=>{
  const {id}=req.params
  await User.findByIdAndDelete(id)
  res.status(200).json({msg:"Usuario borrado."})
})

router.patch('/editaUsuario/:id', async (req,res)=>{
  const {name,email,rol}=req.body
  const {id}=req.params
  const user= await User.findByIdAndUpdate(id,{name,email,rol},{new:true})
    .catch(err=>res.status(500).json(err))
  res.status(200).json({user})
})
router.patch(`/cambiaEstatus/:id`, async (req,res)=>{
  const {id}=req.params
  const user= await User.findOne({_id:id})
    .catch(err=>res.status(500).json(err))
  user.isActive=!user.isActive
  user.save()
  res.status(200).json({user})
})

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
      await confirmAccount(email,password,name).catch(async err=>{console.log(err)
        const newPassword="Em1$ha"
        await User.findByUsername(email).then(async (changeUser)=>{
          if (changeUser){
              await changeUser.setPassword(newPassword)
              .then(user=>{
                changeUser.save();
                res.status(201).json({ user })
              })
              .catch(err=>res.status(500).json({err}));
          } else {
              res.status(500).json({err});
          }
        })
        
      })
      res.status(201).json({ user })})
    .catch((err) => res.status(500).json({ err }));
});

router.patch('/changePassword',async(req,res)=>{
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
