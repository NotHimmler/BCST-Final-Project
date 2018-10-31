const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const patientRouter = require('./GoalRouter')

// test the headers
describe('Unit testing the / route', () => {

    it('should return OK status', function() {
      return request(GoalRouter)
        .get('/')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

});

describe('Unit testing the /current route', () => {

    it('should return OK status', function() {
      return request(app)
        .get('/new Goal')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

});

describe('Unit testing the /Goal route', () => {

    it('should return OK status', function() {
      return request(app)
        .get('/past Goal')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

});

describe('Unit testing the /Goal route', () => {

    it('should return OK status', function() {
      return request(app)
        .get('/sub goal')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

});
