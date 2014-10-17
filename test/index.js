var should = require('chai').should();
var api = require('../');
var helpers = require('../helpers');

var coordinates = {
  latitude: 38.905655,
  longitude: -77.041686
}

describe('Bikeshare api', function() {
  it('Should be able to retrive xml data', function(done) {
    helpers.get(function(err, data) {
      if (err) return done(err);
      data.should.be.xml;
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
      data.length.should.be.above(300);
      return done();
    });
  });

  it('should be able to get a select few stations', function(done) {
    api.getMultiple(['2','44','79', '86','127', '129', '222'], function(err, data) {
      if (err) return done(err);
      data[0].id[0].should.eql('2');
      data[1].id[0].should.eql('44');
      data[2].id[0].should.eql('79');
      data[3].id[0].should.eql('86');
      data[4].id[0].should.eql('127');
      data[5].id[0].should.eql('129');
      data[6].id[0].should.eql('222');
      return done();
    });
  });

  it('should be able to get a station by id', function(done) {
    api.getById('30', function(err, data) {
      if (err) return done(err);
      data[0].id[0].should.eql('30');
      return done();
    });
  });

  it('should be able to get a station by name', function(done) {
    api.getByName('John McCormack Dr & Michigan Ave NE', function(err, data) {
      if (err) return done(err);
      data[0].name[0].should.be.eql('John McCormack Dr & Michigan Ave NE')  ;
      return done();
    });
  });

  it('should be able to get the 5 closest stations', function(done) {
    api.getByClosest(coordinates, 4, function(err, data) {
      if (err) return done(err);
      data[0].id[0].should.eql('79');
      data[1].id[0].should.eql('136');
      data[2].id[0].should.eql('86');
      data[3].id[0].should.eql('185');
      return done();
    });
  });
});