const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const fitbitTokenRouter = require('./FitbitTokenRouter.js')

// test the headers
describe('Unit testing the / router', () => {

    it('should return OK status', function() {
      return request(fitbitTokenRouter)
        .get('/')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

});