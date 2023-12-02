const { Router } = require('express');
// const Card = require('../models/card');
const Course = require('../models/course');
const router = Router();



router.post('/add', async (req, res) => {
  console.log(req.body.id)
  const course = await Course.findById(req.body.id);
  await req.user.addToCart(course)// await Card.add(course);
  const card = await Card.fetch();  // Отримати оновлені дані картки
  res.status(200).json(card);
});

router.get('/count', async (req, res) => {
  const card = await Card.fetch();   
  res.status(200).json(card);
});

router.delete('/remove/:id', async(req, res) => {
  try{
    const card = await Card.remove(req.params.id);
    res.status(200).json(card);
  }catch (error) {
    console.log(error)
  }
});

router.delete('/remove-all/:id', async(req, res) => {
  try{
    const card = await Card.removeAll(req.params.id);
    res.status(200).json(card);
  }catch (error) {
    console.log(error)
  }
});

router.get('/', async (req, res) => {
  const card = await Card.find();
  res.render('card', {
    title: 'Корзина',
    isCard: true,
    courses: card.courses,
    price: card.price
  });
});



module.exports = router;
