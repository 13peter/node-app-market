const { Schema, model } = require('mongoose');

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: String,

    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',

    }
});

const Course = model('Course', courseSchema);

module.exports = Course;

// Assuming you have already connected to MongoDB using mongoose.connect()

// const mongoose = require('mongoose');
// const { Schema, model } = mongoose;

// const courseSchema = new Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     img: String 
// });

// const Course = model('Course', courseSchema);

// module.exports = Course;
