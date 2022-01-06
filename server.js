const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

//create server app
const app = express();

const userRouter = require('./src/routers/userRouter');

// "Informing" the express to use the EJS as views engine
app.set('views', __dirname+ '/views');
app.set('view engine', 'ejs');

// Define I want to use static archives
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render("index")
})

app.get('/login', (req, res) => {
    res.render("login")
})

app.get('/admin', (req, res) => {
    res.render("admin")
})

//db connection
mongoose.connect(process.env.DB_CONNECTION)
const db = mongoose.connection;

db.on('error', () => console.error);
db.once('open', () => console.log('=^.^= DB YEEEP! Connection Established =^.^='));


/* middlewares */
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));


/* routers */
app.use('/users', userRouter)



//port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server up and running on port:', port)
})