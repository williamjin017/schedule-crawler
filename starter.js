/**
 * Created by william on 4/15/17.
 */
var Course = require('./model/Course');
var Section = require('./model/Section');
var ucb_hacker = require('./crawler/uc_berkeley/uc_berkeley_hacker');
var ucb_uitl = require('./data/uc_berkeley/utility');

ucb_uitl.saveJsonSchedule('174');
