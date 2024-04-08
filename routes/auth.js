const { Router } = require('express')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const User = require('../models/user')
const { MongoCryptInvalidArgumentError } = require('mongodb')
const router = Router()

router.get('/login', async (req, res) => {
  res.render('auth/login', {
    title: 'Авторизация',
    isLogin: true,
    loginError: req.flash('loginError'),
    registerError: req.flash('registerError')
  })
})

router.get('/logout', async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const candidate = await User.findOne({ email })

    if (candidate) {
      req.flash('LoginError', 'Такий емейл вже використовується')
      const areSame = await bcrypt.compare(password, candidate.password)
      if (areSame) {
        req.session.user = candidate
        req.session.isAuthenticated = true
        req.session.save(err => {
          if (err) {
            throw err
          }
          res.redirect('/')
        })
      } else {
        req.flash('loginError', 'Невірний пароль')
        res.redirect('/auth/login')
      }
    } else {
      req.flash('loginError', 'Такого користувача не існує')
      res.redirect('/auth/login')
    }
  } catch (e) {
    console.log(e)
  }
})

router.post('/register', async (req, res) => {
  try {

    const { email, password, repeat, name } = req.body
    const candidate = await User.findOne({ email })

    if (candidate) {
      req.flash('registerError', 'Такий емейл вже зареєстрований ')
      res.redirect('/auth/login#register')
    } else {
      const hashPassword = await bcrypt.hash(password, 10)
      const user = new User({
        email, name, password: hashPassword, cart: { items: [] }
      })
      await user.save()

      res.redirect('/auth/login')
    }
  } catch (e) {
    console.log(e)
  }
})

// router.get('/reset',(req,res) =>{
//   res.render('auth/reset',{
//     title:'Забули пароль?',
//     error: req.flash('error')
//   })
// })
// router.post('/reset',(req,res) =>{
//   try{
//     crypto.randomBytes(32, async(err,buffer)=>{
//      if(err){
//       req.flash('error','Щось пійшло не так. Спробуйте будьласка пізніше.')
//       return res.redirect('auth/reset')
//      }
//      const token = buffer.toString('hex')
//      const candidate = await User.findOne({email: req.body.email})
//      if(candidate){
//       candidate.resetToken = token
//       candidate.resetTokenExp = Date.now() + 60 * 60 * 1000
//       await candidate.save()
//       await transporter.sendMail()
//      }else{
//       req.flash('error','Такий email не існує')
//       res.redirect('/auth/reset')
//      }
//     })

//   }catch(e){
//     console.log(e)
//   }

// })
module.exports = router 
