const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
//const { dirsToCreate } = require('gh-pages/lib/util');
const knex = require('knex');
const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require ('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : '1234',
      database : 'face-detection'
    }
  });




const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('success');
})

app.post('/signin', (req, res) => {signIn.signInHandler(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.registerHandler(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.profileGetHandler(req, res, db)})

app.put('/image', (req, res) => {image.imageHandler(req, res, db)})

app.post('/imageUrl', (req, res) => {image.apiCallHandler(req, res)})

app.listen(3000, () => {
    console.log("app is running on port 3000");
});