var should = require('chai').should();
var api = require('../');
var helpers = require('../helpers');

var coord1 = {
  latitude: 38.9059581,
  longitude: -77.0416805
}

describe('Bikeshare api', function() {
  it('Should be able to retrive xml data', function(done) {
    helpers.get(function(err, data) {
      if (err) return done(err);
      return done();
    });
  })

  it('Should be able to parse xml to json', function(done) {
    helpers.get(function(err, data) {
      if (err) return done(err);
      helpers.parseXml(data, function(err, parsed) {
        if (err) return done(err);
        data.should.be.json;
        data.length.should.be.above(300);
        return done();
      });
    });
  });

  it('should be able to get all stations', function(done) {
    api.getAll(function(err, data) {
      if (err) return done(err);
      data.should.be.json;
      data.stations.station.length.should.be.above(300);
      return done();
    });
  });

  it('should be able to get a select few stations', function(done) {
    api.getMultiple(['30', '40', '41', '222'], function(err, data) {
      if (err) return done(err);
      data.should.be.an.array;
      data[0].id[0].should.eql('30');
      data[1].id[0].should.eql('40');
      data[2].id[0].should.eql('41');
      data[3].id[0].should.eql('222');
      return done();
    });
  });

  it('should be able to get a station by id', function(done) {
    api.getById(30, function(err, data) {
      if (err) return done(err);
      data.should.be.json;
      data.id[0].should.eql('30');
      return done();
    });
  });

  it('should be able to get a station by name', function(done) {
    api.getByName('John McCormack Dr & Michigan Ave NE', function(err, data) {
      if (err) return done(err);
      data.should.be.json;
      data.name[0].should.be.eql('John McCormack Dr & Michigan Ave NE')  ;
      return done();
    });
  });

  it('should be able to get the 5 closest stations', function(done) {
    api.getByClosest(coord1, 5, function(err, data) {
      if (err) return done(err);
      data.should.be.json;
      data.length.should.be.eql(5);
      return done();
    });
  });
});