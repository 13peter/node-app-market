// import 'mongoose';
// import { Schema } from 'mongoose';
const {Schema, model} = require('mongoose')
const userSchema = new Schema({
    email: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    cart: {
      items: [
        {
          count: {
            type: Number,
            required: true,
            default: 1
          },
          courseId: {  
            type: Schema.Types.ObjectId, 
            ref: 'Course',
            required: true
          }
        }
      ]
    }
  });

  userSchema.Schema.addToCart = function(course){
    const clonedItems = [...this.cart.items]
    const idx = clonedItems.findIndex(c =>{
        return c.courseId.toString()
    }) 
    if(idx>=0){
       clonedItems[idx].count = this.cart.items[idx].count = +1
    }else{
        clonedItems.push({
            courseId:course_id
        })
        }

  }
  
module.exports = model('User', userSchema)