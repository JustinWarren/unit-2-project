//-----------
//Dependencies
//-----------
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const Trip = require('./models/trips.js');
const db = mongoose.connection
require('dotenv').config()
//____________
//PORT
//____________
const PORT = process.env.PORT

console.log(PORT);


// --------
//DATABASE
//---------
const MONGODB_URI = process.env.MONGODB_URI
console.log(MONGODB_URI);

mongoose.connect(MONGODB_URI, { useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false, useCreateIndex: true })

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// --------
//MIDDLEWARE
//---------
//use public folder for static assets like CSS JS
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

//___________________
// Routes
//___________________
//localhost:3000

//This is the index route
app.get('/trips', (req, res)=>{
  Trip.find({}, (error, allTrips)=> {
    res.render('index.ejs', {
        trips: allTrips
    });
  });
});


//This is creating a new route
app.get('/trips/new' , (req, res) => {
  res.render('new.ejs');
});

//This the create route
app.post('/trips', (req, res)=> {
  Trip.create(req.body, (error, createdTrip)=>{
      res.send(createdTrip);
  });
});

// Note to self - I just created the new route and new.ejs and then am in then
// process of creating the create route.  Tried to do the heroku push and have error
// screen.  Maybe because I don't have index page yet?
//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
