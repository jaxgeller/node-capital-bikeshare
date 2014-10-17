var request = require('request');
var parseString = require('xml2js').parseString;

function get(done) {
  var opts = {
    url: 'https://www.capitalbikeshare.com/data/stations/bikeStations.xml',
    timeout: 5000,
    pool: {maxSockets: Infinity}
  }
  request(opts, function(err, res, body) {
    if (err) {
      return done(err);
    }

    else if (res.statusCode === 408 || res.statusCode === 504) {
      return setTimeout(getData, 2500, done);
    }

    else if (res.statusCode !== 200) {
      return done(new Error('Returned: ' + res.statusCode));
    }

    else if (res.statusCode === 200 && body) {
      return done(null, body);
    }

    else {
      return done(new Error('no response'));
    }

  });
}

function parseXml(data, done) {
  parseString(data, function(err, data) {
    if (err) {
      return done(err);
    }

    else if (!data) {
      return done(new Error('XML parsing error'));
    }

    else if (data.stations.station) {
      return done(null, data.stations.station);
    }

    else {
      return done(new Error('error parsing xml'));
    }
  }); 
}

function getAndParse(done) {
  
  get(function(err, data) {  
    if (err) {
      return done(err);
    }

    else if (data) {
      parseXml(data, function(err, res) {
        if (err) {
          return done(err);
        }
        
        else if (res){
          return done(null, res);
        }
      });
    }
  });
}

exports.get = get;
exports.parseXml = parseXml;
exports.getAndParse = getAndParse;