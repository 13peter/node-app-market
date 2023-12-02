const {Router} = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', (req, res)=>{
    res.render('add',{
        title:'добавить курс',
        isAdd: true
      })
    })
 
router.post('/', async(req, res) => {
  // const course = new Course(req.body.title, req.body.price, req.body.img)
  const course = new Course({
    title: req.body.title,
    price: req.body.price,
    img: req.body.img,
    userId: req.user._id
  })

  try{
    await course.save()
  } catch(err){
    console.log(err)
  }
  


  res.redirect('/courses')
})

module.exports = router;