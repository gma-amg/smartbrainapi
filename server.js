const express=require('express');
const cors=require('cors');
const bcrypt=require('bcrypt-nodejs');
const bodyParser=require('body-parser');
const knex=require('knex');

const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '',
    database : 'smartbrain'
  }
});

const app=express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=>{res.send('success');})

app.post('/signin', (req,res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req,res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res,) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res,) => {image.handleApiCall(req, res)})


const PORT = process.env.PORT

app.listen(PORT, ()=> {
	console.log(`app is running on port ${PORT}`);
})

console.log(PORT);