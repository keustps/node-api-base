const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/server');

chai.use(chaiHttp);
chai.should();

describe('Testing Authentication...', () =>{
    describe('POST /auth', ()=>{
        it('Should return 401 if credential is not valid', (done) =>{
            chai.request(app)
            .post('/api/auth')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({ username: 'username', password: 'password' })
            .end( (err, res) =>{
                res.should.have.status(401);
                res.should.be.json;
                done();
            });
        });
        it('Should return 201 if credential is valid', (done) =>{
            chai.request(app)
            .post('/api/auth')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({ username: 'alice', password: 'alice' })
            .end( (err, res) =>{
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.have.property('token');
                res.body.token.should.be.a('string').that.is.not.empty;
                done();
            });
        });
    });
});
