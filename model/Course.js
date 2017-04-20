/**
 * Created by william on 4/15/17.
 */
var params = require('./params');

function Course(hashKey, rangeKey, termCode, subjectCode, courseNumber, courseName) {
    this.hashKey = hashKey;
    this.rangeKey = rangeKey;
    this.termCode = termCode;
    this.subjectCode = subjectCode;
    this.courseNumber = courseNumber;
    this.courseName = courseName;
}

Course.prototype.courseString = function () {
    return this.hashKey + params.delimiter +
        this.rangeKey + params.delimiter +
        this.termCode + params.delimiter +
        this.subjectCode + params.delimiter +
        this.courseNumber + params.delimiter +
        this.courseName;
};

module.exports = Course;