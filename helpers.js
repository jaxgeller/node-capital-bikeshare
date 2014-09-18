var url = 'https://www.capitalbikeshare.com/data/stations/bikeStations.xml';
var request = require('request');
var parseString = require('xml2js').parseString;

exports.get = function(done) {
  request(url, function(err, res, body) {
    if (err) return done(err);
    if (res.statusCode !== 200) return done(new Error('Returned: ' + res.statusCode));
    if (res.statusCode === 200 && body) return done(null, body);
  }); 
}

exports.parseXml = function(data, done) {
  parseString(data, function(err, data) {
    if (err) return done(err);
    if (!data) return done(new Error('No data returned'));
    if (data) return done(null, data);
  }); 
}