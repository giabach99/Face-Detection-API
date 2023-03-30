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
      connectionString: 'dpg-cghvgs02qv2772g8kcog-a.singapore-postgres.render.com',
      ssl: {rejectUnauthorized: false},
      host : 'dpg-cghvgs02qv2772g8kcog-a',
      port : 5432,
      user : 'postmydb_wiu9_userres',
      password : 'wCdORvu9R2X88VYCfolFfIMAToh9Lndl',
      database : 'mydb_wiu9'
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

app.listen(db.connection.port, () => {
    console.log("app is running on port 5432");
});