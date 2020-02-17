const chai = require('chai');
const chaiHttp = require('chai-http');
const request = chai.request;
const config = require('../../src/config');
const url = `http://localhost:${config.server.port}`;

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Testing User CRUD operations...', () =>{
    describe('GET /auth', ()=>{
        it("Should need authorization", (done) =>{
            chai.request(url)
            .get('/user')
            .end( (err, res) =>{
                res.should.have.status(401);
                done();
            });
        })
    })
})

//https://mherman.org/blog/testing-node-js-with-mocha-and-chai/
//https://stackoverflow.com/questions/38989102/how-to-test-login-api-nodejs-using-mocha-and-chai
//https://medium.com/@asciidev/testing-a-node-express-application-with-mocha-chai-9592d41c0083
