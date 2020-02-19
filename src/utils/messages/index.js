const httpErrors = {
    '401' : 'Authentication Required',
    '404' : 'Not Found',
    '422' : 'Validation Error',
    '500' : 'Internal Server Error'
};

const routerErrors = {
    NOT_FOUND : (path, method) => {return `Cannot ${method} ${path} on server`;}
};

const authErrors = {
    INVALID_TOKEN : 'Invalid Token',
    ONLY_ADMIN : 'This functionality is restricted to administrators',
    WRONG_USER_OR_PASS : 'Invalid user or password'
};

const requestValidationErrors = {
    CANT_BE_EMPTY : (field) => {return `${field} cant be empty`;}
};

const modelValidation = {
    LOGIN_NOT_UNIQUE : 'There is another user with this login ({VALUE})',
    IS_REQUIRED : (field) =>{ return `${field} is required`;}
};

const crudErros = {
    WHEN_CREATE : (entity) =>{ return `Error when inserting ${entity}`;},
    WHEN_READ : (entity) =>{ return `Error when reading ${entity}`;},
    WHEN_UPDATE : (entity) =>{ return `Error when updating ${entity}`;},
    WHEN_DELETE : (entity) =>{ return `Error when deleting ${entity}`;},
};

module.exports = {
    HttpErrors : httpErrors,
    RouterErrors : routerErrors,
    AuthErrors : authErrors,
    RequestValidationErrors : requestValidationErrors,
    ModelValidation : modelValidation,
    CrudErrors : crudErros
};
