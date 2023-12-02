
// const express = require('express');
// const exphbs = require('express-handlebars');
// const path = require('path');
// const mongoose = require('mongoose');
// const homeRoutes = require('./routes/home');
// const addRoutes = require('./routes/add');
// const coursesRoutes = require('./routes/courses');
// const cardRoutes = require('./routes/card');

// const app = express();

// const hbs = exphbs.create({
//   defaultLayout: 'main',
//   extname: 'hbs'
// });

// app.engine('hbs', hbs.engine);
// app.set('view engine', 'hbs');
// app.set('views', 'viewes'); // Fix the typo in the directory name

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use('/', homeRoutes);
// app.use('/courses', coursesRoutes);
// app.use('/add', addRoutes);
// app.use('/card', cardRoutes);

// const PORT = process.env.PORT || 3000;

// const password s= "dOdw9cdDmTbusYIC";

// async function start() {
//   try {
//     const uri = `mongodb+srv://admin:${password}@cluster0.ffk3953.mongodb.net/?retryWrites=true&w=majority`;
//     await mongoose.connect(uri, {
//       // useNewUrlParser: true, // Remove this line
//       // useUnifiedTopology: true // Remove this line
//     });
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

// start(); // Add the missing closing parenthesis




const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cardRoutes = require('./routes/card');
const User = require('./models/user')
// const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'viewes');

app.use(async(req, res, next) =>{
  try{
    const user = await User.findById('656797d14a1a934fd72f9ad0');
    req.user = user;
    next()
  } catch(err){
    console.log(err);
  }
  
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', homeRoutes);
app.use('/courses', coursesRoutes);
app.use('/add', addRoutes);
app.use('/card', cardRoutes);

const PORT = process.env.PORT || 3000;

const password = "dOdw9cdDmTbusYIC";

async function start(){
  try{
    const url = `mongodb+srv://admin:${password}@cluster0.ffk3953.mongodb.net/shop`;
  await mongoose.connect(url)

const candidate = await User.findOne()
if(!candidate){
  const user = new User({
    email:'13litvinpeter@gmail.com',
    name:'Peter',
    cart: {items: []}
  }) 
  await user.save()
}

  app.listen(PORT, () =>{
    console.log(`Server is running on port  ${PORT}`)
  })
  } catch(err){
    console.log(err)
  }
}
start()





// const uri = `mongodb+srv://admin:${password}@cluster0.ffk3953.mongodb.net/?retryWrites=true&w=majority`;

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });


// async function start(){
//   try{
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");

//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   } catch (err) {
//     console.log(err)
//     await client.close();
//   }
// }

// start()