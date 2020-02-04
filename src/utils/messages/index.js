const httpErrors = {
    '401' : 'Authentication Required',
    '404' : 'Not Found',
    '500' : 'Internal Server Error'
};

const routerErrors = {
    NOT_FOUND : (path, method) => {return `Cannot ${method} ${path} on server`;}
};

module.exports = {
    HttpErrors : httpErrors,
    RouterErrors : routerErrors
};