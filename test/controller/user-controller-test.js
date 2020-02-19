const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/server');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Testing User CRUD operations...', () =>{
    describe('GET /user', ()=>{
        it('Should need authorization', (done) =>{
            chai.request(app)
            .get('/user')
            .end( (err, res) =>{
                res.should.have.status(401);
                done();
            });
        });
    });
});
