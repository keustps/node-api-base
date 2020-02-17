const chai = require('chai');
const AppError = require('../../src/utils/error');
const assert = chai.assert;

//Constants for use on tests
const [errorCode, errorMessage, errorDetail] = [401, "Generic Error", { code : 500, errors : [ {message : "Some error #1", message : "Some error #2"}] }]

describe('Testing Generic AppError class...', () =>{
    it('Error without description and detail', ()=>{
        let error = new AppError(errorCode);
        assert.equal(error.code, errorCode);
    });

    it('Error with description and without detail', ()=>{
        let error = new AppError(errorCode, errorMessage);
        assert.equal(error.code, errorCode);
        assert.equal(error.message, errorMessage);
    });

    it('Error with description and detail', ()=>{
        let error = new AppError(errorCode, errorMessage, errorDetail);
        assert.equal(error.code, errorCode);
        assert.equal(error.message, errorMessage);
        assert.equal(error.detail.errors[1], errorDetail.errors[1]);
        assert.equal(error.detail.errors[2], errorDetail.errors[2]);
    });
})
