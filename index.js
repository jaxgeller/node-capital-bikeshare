var request = require('request');
var parseString = require('xml2js').parseString;
var geo = require('node-geo-distance');

var helpers = require('./helpers');

exports.getAll = function(done) { 
  helpers.get(function(err, data) {
    if (err) return done(err);
    helpers.parseXml(data, function(err, parsed) {
      if (err) return done(err);
      return done(null, parsed);
    });
  });
}


exports.getById = function(id, done) {
  helpers.get(function(err, data) {
    if (err) return done(err);
    helpers.parseXml(data, function(err, parsed) {
      if (err) return done(err);
      
      var start = 0;
      if (id > 8) start = id - 8;
      for (var i = start; i<id+8; i++) {
        if (parsed.stations.station[i].id[0] == id) {
          return done(null, parsed.stations.station[i]);
        }
      }

      return done(new Error('Station not found'));
    });
  });
}


exports.getByName = function(name, done) {
  helpers.get(function(err, data) {
    if (err) return done(err);
    helpers.parseXml(data, function(err, parsed) {
      if (err) return done(err);
      var max = parsed.stations.station.length;
      for (var i=0; i < max; i ++) {
        if (parsed.stations.station[i].name[0] === name) {
          return done(null, parsed.stations.station[i]);
        }
      }
      return done(new Error('Station not found'))
    });
  });
}

exports.getByClosest = function(location, number, done) {

  helpers.get(function(err, data) {
    if (err) return done(err);

    helpers.parseXml(data, function(err, parsed) {
      if (err) return done(err);
      var max = parsed.stations.station.length;
      var holder = [];
      for (var i=0; i< max; i++) {
        var station = parsed.stations.station[i];
        var distance = {latitude: parseFloat(station.lat[0]), longitude: parseFloat(station.long[0])}
        station.distance = geo.vincentySync(distance, location);
        holder.push(station)
      }
      holder.sort(function(a, b) {
        return a.distance - b.distance;
      });
      return done(null, holder.slice(0, number));
    });
  })
}


