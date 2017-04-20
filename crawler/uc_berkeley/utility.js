/**
 * Created by william on 4/17/17.
 */

function getTerm(termCode) {
    var year = termCode.substr(0, 2);
    if (termCode.length != 3) {
        return false;
    }
    var term = termCode.substr(2, 3);
    if (term == '1') {
        return 'Spring 20' + year;
    } else if (term == '2') {
        return 'Winter 20' + year;
    } else if (term == '3') {
        return 'Summer Sessions 20' + year;
    } else if (term == '4') {
        return 'Fall 20' + year;
    }
    return false;
}

exports.getTerm = getTerm;

