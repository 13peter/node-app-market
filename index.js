const express = require('express');
const exphbs = require('express-handlebars');
const csrf = require('csurf');
const flash = require('connect-flash');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session)
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const authRoutes = require('./routes/auth')
const ordersRoutes = require('./routes/orders');
const cardRoutes = require('./routes/card');
const varMiddleware = require('./middleware/variables') ;
const userMiddleware = require('./middleware/user');
const keys = require('./keys');

const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  }
});

const store = new MongoStore({
  collection:'sessions',
  uri: keys.MONGODB_URI
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'viewes');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
  secret: keys.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store
}))
app.use(csrf());
app.use(flash())
app.use(varMiddleware);
app.use(userMiddleware);

app.use('/', homeRoutes);
app.use('/courses', coursesRoutes);
app.use('/add', addRoutes);
app.use('/card', cardRoutes);
app.use('/orders', ordersRoutes);
app.use('/auth',authRoutes)

const PORT = process.env.PORT || 3000;

async function start(){
  try{
    // const url = `mongodb+srv://admin:${password}@cluster0.ffk3953.mongodb.net/shop`;
    await mongoose.connect(keys.MONGODB_URI);

  app.listen(PORT, () =>{
    console.log(`Server is running on port  ${PORT}`)
  })
  } catch(err){
    console.log(err)
  }
}
start()