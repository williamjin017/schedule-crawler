/**
 * Created by william on 4/15/17.
 */

var params = require('./params');
var Course = require('./Course');
var util = require('util');

function Section() {
    Course.super_.call(this);
}
function Section(hashKey, rangeKey, termCode, subjectCode, courseNumber, courseName,
    days, startTime, endTime, instructor, location) {
    Course.call(this,hashKey, rangeKey, termCode, subjectCode, courseNumber, courseName);
    this.days = days;
    this.startTime = startTime;
    this.endTime = endTime;
    this.instructor = instructor;
    this.location = location;
}
util.inherits(Section, Course);

Section.prototype.sectionString = function () {
    return this.courseString() + params.delimiter +
            this.days + params.delimiter +
            this.startTime + params.delimiter +
            this.endTime + params.delimiter +
            this.instructor + params.delimiter +
            this.location;
};

module.exports = Section;
