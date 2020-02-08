const httpErrors = {
    '401' : 'Authentication Required',
    '404' : 'Not Found',
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

module.exports = {
    HttpErrors : httpErrors,
    RouterErrors : routerErrors,
    AuthErrors : authErrors,
    RequestValidationErrors : requestValidationErrors
};
