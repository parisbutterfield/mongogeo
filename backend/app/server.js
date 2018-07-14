'use strict';

const express = require('express');
const cors = require('cors');
const uuidv1 = require('uuid/v1');
const bodyParser = require('body-parser')


const mongoose = require('mongoose');

mongoose.connect('mongodb://mongodb/locations');

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
     
 const coordSchema = new Schema({
        text: { type: String },
        loc: {
          type: { type: String },
          coordinates: [Number]
        }
      });
const Coordinate = mongoose.model('Coordinate', coordSchema);




// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App

const app = express();
app.use(cors())
app.use(bodyParser.json())


app.post('/addLocation', (req, res) => {
    console.log(req.body)
    var cords = new Coordinate();
    cords.text = uuidv1()
    cords.loc.type = "Point";
    cords.loc.coordinates = [req.body.lon, req.body.lat];
    cords.save(function (err) {
        if (!err) console.log('Success!');
      });
  res.send('200');
});


app.get('/getLocations', (req, res) => {
    Coordinate.find({}, function(err, results) {
        res.send(results);  
      });

});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);