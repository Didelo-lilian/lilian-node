const createHomeParagraph = require('./createHomeParagraph');
const getHomeParagraph = require('./getHomeParagraph');
const getHomeParagraphs = require('./getHomeParagraphs');
const updateHomeParagraph = require('./updateHomeParagraph');
const deleteHomeParagraph = require('./deleteHomeParagraph');

module.exports = {
    paths: {
        "/home/{language}": {
            ...getHomeParagraph,
        },
        "/home": {
            ...getHomeParagraphs,
            ...createHomeParagraph,
            ...updateHomeParagraph,
            ...deleteHomeParagraph,
        }
    }
}