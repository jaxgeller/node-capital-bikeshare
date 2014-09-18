var request = require('request');
var parseString = require('xml2js').parseString;


var url = 'https://www.capitalbikeshare.com/data/stations/bikeStations.xml';




// Helpers
function get(done) {
  request(url, function(err, res, body) {
    if (err) return done(err);
    if (res.statusCode !== 200) return done(new Error('Returned: ' + res.statusCode));
    if (res.statusCode === 200 && body) return done(null, body);
  });
}

function parseXml(data, done) {
  parseString(data, function(err, data) {
    if (err) return done(err);
    if (!data) return done(new Error('No data returned'));
    if (data) return done(null, data);
  });
}


// api
function getAll(done) { 
  get(function(err, data) {
    if (err) return done(err);
    parseXml(data, function(err, parsed) {
      if (err) return done(err);
      return done(null, parsed);
    });
  });
}

function getById(id, done) {
  get(function(err, data) {
    if (err) return done(err);
    parseXml(data, function(err, parsed) {
      if (err) return done(err);
      
      var start = 0;
      if (id > 8) start = id - 8;
      for (var i = start; i<id+8; i++) {
        if (parsed.stations.station[i].id[0] == id) {
          return done(null, parsed.stations.station[i]);
        }
      }

      return done(new Error('Id not found'));
    });
  });
}



// Run

getById(200, function(err, data) {
  console.log(err)
  console.log(data);
})