const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  let title = 'Курсы'
  // if(user){
  //   title = title + user.name
  //   age = `You are ${user.age} years old!`
  //   city = `In ${user.city}`
  // } 

  res.render('index', {
    title,
    isHome: true
  })
})

module.exports = router