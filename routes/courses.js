const express = require('express');
const Course = require('../models/course');
const { populate } = require('../models/user');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const courses = await Course.find()
    .populate('userId','email name')
    .select('title price img');


    console.log(courses)
    res.render('courses', {
      title: 'курсы',
      iscourses: true,
      courses: courses
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).send('Error fetching courses');
  }
});

router.post('/edit', async (req, res) => {
  try {
    const { id } = req.body;
    delete req.body.id;
    await Course.findByIdAndUpdate(id, req.body);
    res.redirect('/courses');
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).send('Error updating course');
  }
});

router.post('/remove', async (req,res) =>{
  try{
    await Course.deleteOne({_id: req.body.id});
    res.redirect('/courses');
  }catch(err){
    console.error('Error updating course:', error);
    res.status(500).send('Error updating course');
  }
  await Course.deleteOne({
    _id: req.body.id
  })
})

router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.render('course', {
      layout: 'empty',
      title: `Kurs ${course.title}`,
      course: course
    });
  } catch (error) {
    console.error('Error fetching course details:', error);
    res.status(500).send('Error fetching course details');
  }
});

router.get('/:id/edit', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.render('course-edit', {
      title: `Kurs ${course.title}`,
      course: course
    });
  } catch (error) {
    console.error('Error fetching course for editing:', error);
    res.status(500).send('Error fetching course for editing');
  }
});

module.exports = router;






// const express = require('express');
// const Course = require('../models/course');
// const router = express.Router();

// router.get('/', async (req, res) => {
//   try {
//     const courses = await Course.find();
//     res.render('courses', {
//       title: 'курсы',
//       iscourses: true, // added a comma here to separate the properties
//       courses: courses // corrected the object property to properly pass the 'courses' array
//     });
//   } catch (error) {
//     // Handle errors, perhaps send a 500 server error response
//     res.status(500).send('Error fetching courses');
//   }
// });

// router.post('/edit', async(req, res) => {
//   const {id} = req.body
//   delete req.body.id
//   await Course.findByIdAndUpdate(id, req.body)

//   res.redirect('/courses')
// });

// router.get('/:id', async (req, res) => {
//   const course = await Course.findById(req.params.id)

//   res.render('course', {
//     layout: 'empty',
//     title: `Kurs ${course.title}`,
//     course
//   })
// });


// router.get('/:id/edit', async (req, res) => {
//   const course = await Course.findById(req.params.id)

//   res.render('course-edit', {
//     title: `Kurs ${course.title}`,
//     course
//   })
// });

// module.exports = router;