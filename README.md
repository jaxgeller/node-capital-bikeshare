# Capital-Bike-Share.js

[![Build Status](https://travis-ci.org/jacksongeller/Capital-Bike-Share.js.svg)](https://travis-ci.org/jacksongeller/Capital-Bike-Share.js)


###Install
`$ npm install capital-bike-share-js --save`


---
### API

##### `getAll(callback)`
+ `callback(err, data)`


##### `getById(id, callback)`
+ `id` number
+ `callback(err, data)`


##### `getByName(name, callback`
+ `name` string
+ `callback(err, data)`


##### `getByClosest(location, limit, callback)`
+ `location` obj {latitude: number, longitude: number}
+ `limit` number 
+ `callback(err, data)`



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