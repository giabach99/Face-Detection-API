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
      connectionString: 'dpg-cgimqm7dvk4vd54j64p0-a.oregon-postgres.render.com',
      ssl: {rejectUnauthorized: false},
      host : 'dpg-cgimqm7dvk4vd54j64p0-a',
      port : process.env.PORT,
      user : 'mydb_eb5z_user',
      password : 'Qk0KoJ9A8nYAVPvUNlHVwFQB2mBeNR7j',
      database : 'mydb_eb5z'
    }
  });


// const db = knex({
//   client: 'pg',
//   connection: {
//     host : '127.0.0.1',
//     port : 5432,
//     user : 'postgres',
//     password : 'test', //or 1234
//     database : 'postgres' //'face-detection'
//   }
// });



const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('success boy');
})

app.post('/signin', (req, res) => {signIn.signInHandler(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.registerHandler(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.profileGetHandler(req, res, db)})

app.put('/image', (req, res) => {image.imageHandler(req, res, db)})

app.post('/imageUrl', (req, res) => {image.apiCallHandler(req, res)})

app.listen(process.env.PORT || 3000,  () => {
    console.log(`app is running on port ${process.env.PORT}`);
});