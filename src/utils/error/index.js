const systemMessages = require('../messages');

class AppError {
    constructor(code, message, detail) {

        if (typeof code === 'object') {
            this.code = code.code;
            this.message = code.messagse;
            this.detail = code.detail;
        } else {
            this.code = code ? code : 500;
            this.message = message ? message.toString() : systemMessages.HttpErrors[500];
            this.detail = detail;

            //Handling model validation errors
            if(detail && detail.errors){
                let errors = [];
                for (let field in detail.errors) {
                    errors.push(detail.errors[field].message);
                }
                this.detail = {errors};
            }
        }
    }
}

module.exports = AppError;
