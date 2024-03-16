const {Router} = require('express');
const Course = require('../models/course');
const auth = require('../middleware/auth')
const router = Router();


const UserModel = require('../models/user');
const course = require('../models/course');

function mapCartItems(cart) {
  return cart.items.map( c => {
    if(c.courseId != null){
      return ({
        title: c.title,
        count: c.count,
        id: c.courseId._id,
        price: c.price,
        _id: c._id
      })
    }
  })
}

function computePrice(courses) {
  return courses.reduce((total, course) => {
   return total += course.price * course.count;
    }, 0);
}

router.post('/add', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.body.id);
    if (!course) {
      throw new Error('Курс не найден');
    }
    await req.user.addToCart(course)
    res.status(200).json('Added')
  } catch (err) {
    console.error('Ошибка при добавлении курса в корзину:', err);
    res.status(500).json('Added error', err.message)
  }
});

router.delete('/remove/:id', auth, async (req, res) => {
  await req.user.removeFromCart(req.params.id)
  const user = await req.user.populate('cart.items.courseId')
  const courses = mapCartItems(user.cart)
  const cart = {
    courses, price: computePrice(courses)
  }
  res.status(200).json(cart)
})

router.delete('/remove-all', auth, async (req, res) => {
  await req.user.clearCart()
  const user = await req.user.populate('cart.items.courseId')
  const courses = mapCartItems(user.cart)
  const cart = {
    courses, price: computePrice(courses)
  }
  res.status(200).json(cart)
})

router.get('/count', auth, async (req, res) => {
  try{
    const user = req.user
    // const user = await req.user.populate('cart.items.courseId');
    const courses = mapCartItems(user.cart);
    res.status(200).json(courses)
  } catch(err){
    console.log(err)
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

router.get('/', async (req, res) => {
  try {
    console.log('req.user', req.user)
    console.log('req.session.user', req.session.user)
    const user = req.user;
    // const user = await req.user.populate('cart.items.courseId');
    // console.log(user.cart.items)
    const courses = mapCartItems(user.cart);

    res.render('card', {
      title: 'Корзина',
      courses: courses,
      isCard: true,
      price: computePrice(courses) 
    });

    // res.json(courses)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



module.exports = router;
