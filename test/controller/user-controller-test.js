const chai = require('chai');
const chaiHttp = require('chai-http');
const request = chai.request;
const config = require('../../src/config');
const url = `http://localhost:${config.server.port}`;

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Testing User CRUD operations...', () =>{
    describe('GET /user', ()=>{
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
