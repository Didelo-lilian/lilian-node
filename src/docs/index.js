const basicInfo = require('./basicInfo');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');
const users = require('./users');
const students = require('./students');

const paths = {
    paths: {
        ...users.paths,
        ...students.paths,
    }
}


module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    ...paths,
};