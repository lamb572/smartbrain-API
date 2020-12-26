const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');
const { Client } = require('pg');

const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const profile = require('./controllers/profile');
const image  = require('./controllers/image');

const db = knex({
  connectionString: process.env.postgresql-cubic-27884,
  ssl: {
    rejectUnauthorized: false
  }
    }
);

const app = express();

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {res.send('it is working')})

// signin request
app.post('/signin', (req, res) => {signIn.handleSignIn(req, res, db, bcrypt)})

// register request
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})


// /profile/:userID --> get = user
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})

// image
app.put('/image',(req,res) => {image.handleImage(req, res, db)})

//api
app.post('/imageurl', (req, res) => {image.handleApiCall(req,res)})



app.listen(process.env.PORT || 3000, ()=>{
    console.log(`app is running on port ${process.env.PORT}`);
})
