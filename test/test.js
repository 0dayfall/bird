var superagent = require('superagent');
var expect = require('expect.js');

describe('bird tests', function() {
  var id;
  var birdId;

  it('post bird (without added, visible)', function(done) {
    superagent.post('http://localhost:3000/birds')
      .send({
        name: 'Falken',
        family: 'Trast',
        continents: ['Africa', 'Europa']
      })
      .end(function(e, res) {
        expect(res).to.exist;
        expect(res.statusCode).to.be(200);
        birdId = res.body._id;
        done();
      })
  });

  it('post one more bird', function(done) {
    superagent.post('http://localhost:3000/birds')
      .send({
        name: 'Kaja',
        family: 'Falk',
        continents: ['USA', 'Europa'],
        added: new Date().toISOString().slice(0, 10),
        visible: true
      })
      .end(function(e, res) {
        // this is should.js syntax, very clear
        expect(res).to.exist;
        expect(res.statusCode).to.be(200);
        done();
      })
  });

  it('and one more with duplicate continents', function(done) {
    superagent.post('http://localhost:3000/birds')
      .send({
        name: 'Kaja',
        family: 'Falk',
        continents: ['Europa', 'Europa'],
        added: new Date().toISOString().slice(0, 10),
        visible: true
      })
      .end(function(e, res) {
        // this is should.js syntax, very clear
        expect(res).to.exist;
        expect(res.statusCode).to.be(400);
        done();
      })
  });

  it('get all birds, not the invisible ones..', function(done) {
    superagent.get('http://localhost:3000/birds')
      .send()
      .end(function(e, res) {
        // this is should.js syntax, very clear
        expect(res).to.exist;
        expect(res.statusCode).to.be(200);
        expect(res.body.length).to.be(1); //Only 1 visible
        done();
      })
  });

  it('get a specific bird', function(done) {
    superagent.get('http://localhost:3000/birds/' + birdId)
      .send()
      .end(function(e, res) {
        // this is should.js syntax, very clear
        expect(res).to.exist;
        expect(res.statusCode).to.be(200);
        done();
      })
  });

  it('delete a specific bird', function(done) {
    superagent.del('http://localhost:3000/birds/' + birdId)
      .send()
      .end(function(e, res) {
        // this is should.js syntax, very clear
        expect(res).to.exist;
        expect(res.statusCode).to.be(200);
        done();
      })
  });

  it('try to get deleted one (404)', function(done) {
    superagent.get('http://localhost:3000/birds/' + birdId)
      .send()
      .end(function(e, res) {
        // this is should.js syntax, very clear
        expect(res).to.exist;
        expect(res.statusCode).to.be(404);
        done();
      })
  });

  it('get all birds, should still be 1', function(done) {
    superagent.get('http://localhost:3000/birds')
      .send()
      .end(function(e, res) {
        // this is should.js syntax, very clear
        expect(res).to.exist;
        expect(res.statusCode).to.be(200);
        expect(res.body.length).to.be(1); //Only 1 visible
        done();
      })
  });
});