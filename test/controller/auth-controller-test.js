const chai = require('chai');
const chaiHttp = require('chai-http');
const request = chai.request;
const config = require('../../src/config');
//const url = `http://${config.server.host}:${config.server.port}/api`;
const url = require('../../src/server');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Testing Authentication...', () =>{
    describe('POST /auth', ()=>{
        it("Should return 401 if credential is not valid", (done) =>{
            chai.request(url)
            .post('/api/auth')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({ username: 'username', password: 'password' })
            .end( (err, res) =>{
                res.should.have.status(401);
                done();
            });
        });
        it("Should return 201 if credential is valid", (done) =>{
            chai.request(url)
            .post('/api/auth')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({ username: 'alice', password: 'alice' })
            .end( (err, res) =>{
                res.should.have.status(201);
                done();
            });
        });
    })
})

//https://mherman.org/blog/testing-node-js-with-mocha-and-chai/
//https://stackoverflow.com/questions/38989102/how-to-test-login-api-nodejs-using-mocha-and-chai
//https://medium.com/@asciidev/testing-a-node-express-application-with-mocha-chai-9592d41c0083
