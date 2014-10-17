var geo = require('node-geo-distance');
var helpers = require('./helpers');

exports.getAll = function(done) { 
  helpers.getAndParse(function(err, res) {
    if (err) {
      return done(err);
    }
    else if (res) {
      return done(null, res);
    }
  });
}

exports.getMultiple = function(ids, done) {
  var filtered = [];
  helpers.getAndParse(function(err, res) {
    if (err) {
      return done(err);
    }

    else if (res) {
      res.filter(function(el) {
        for (var i in ids) {
          if (el.id[0] === ids[i]) {
            filtered.push(el);
          }
        }
      });
      return done(null, filtered);
    }
  });
}

exports.getById = function(id, done) {
  helpers.getAndParse(function(err, res) {
    if (err) {
      return done(err)
    }
    else if (res) {
      var filtered = res.filter(function(el) {
        return (el.id[0] === id);
      });
      return done(null, filtered);
    }
  });
}


exports.getByName = function(name, done) {
  helpers.getAndParse(function(err, res) {
    if (err) {
      return done(err);
    }
    else if (res) {
      var filtered = res.filter(function(el) {
        return (el.name[0] === name);
      });
      return done(null, filtered);
    }
  });
}

exports.getByClosest = function(location, number, done) {
  helpers.getAndParse(function(err, res) {
    if (err) {
      return done(err);
    }
    else if (res) {
      var filtered = res.map(function(el) {
        var coordinates = {latitude: parseFloat(el.lat[0]), longitude: parseFloat(el.long[0])}
        el.distance = geo.vincentySync(coordinates, location);
        return el;
      }).sort(function(a, b) {
        return a.distance - b.distance;
      }).slice(0, number);

      return done(null, filtered);
    }
  });
}


