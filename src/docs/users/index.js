const signup = require('./signup');
const login = require('./login');

module.exports = {
    paths:{
        '/signup':{
            ...signup,
        },
        '/login':{
            ...login,
        }
    }
}