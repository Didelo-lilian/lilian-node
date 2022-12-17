const basicInfo = require('./basicInfo');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');
const users = require('./users');
const students = require('./students');
const homeParagraphs = require('./homeParagraphs');
const studentLesson = require('./studentsLessons');

const paths = {
    paths: {
        ...users.paths,
        ...students.paths,
        ...homeParagraphs.paths,
        ...studentLesson.paths,
    }
}


module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    ...paths,
};