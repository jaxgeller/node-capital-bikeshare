# Capital-Bike-Share.js

[![Build Status](https://travis-ci.org/jacksongeller/Capital-Bike-Share.js.svg)](https://travis-ci.org/jacksongeller/Capital-Bike-Share.js)


###Install
`$ npm install capital-bike-share-js --save`


---
### API

##### `getAll(callback)`
+ `callback(err, data)`
+ returns all stations


##### `getById(id, callback)`
+ `id` number
+ `callback(err, data)`
+ returns the station that matches the given id


##### `getByName(name, callback`
+ `name` string
+ `callback(err, data)`
+ returns the station that matches the given name


##### `getByClosest(location, limit, callback)`
+ `location` obj `{latitude: number, longitude: number}`
+ `limit` number 
+ `callback(err, data)`
+ returns stations within the limit that are closest to the location given. Uses haversine geo-distance formula. 



---
### Examples

```js
var api = require('capital-bike-share-js');
var coord1 = {
  latitude: 38.9059581,
  longitude: -77.0416805
}

// Get all
api.getAll(function(err, data) {
  // do something with data;
});


// Get by ID
api.getById(30, function(err, data) {
  // do something with data;
});


// Get by name
api.getByName('John McCormack Dr & Michigan Ave NE', function(err, data) {
  // do something with data;
});


// Get closest
api.getByClosest(coord1, 5, function(err, data) {
  // do something with data;
});

```