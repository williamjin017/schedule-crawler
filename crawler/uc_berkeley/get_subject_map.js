/**
 * Created by william on 4/16/17.
 */
var async = require('async');
var fs = require('fs');
var params = require('../../model/params');


var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

const timeWaiting = 2000;
var homePage = 'http://guide.berkeley.edu/courses/';
var mainDivId = 'atozindex';

//return json object mapping subjectCode to subjectName

function crawlSubjects(callback) {

    var subjectMap = [];
    driver.get(homePage);
    driver.wait(until.elementLocated(By.id(mainDivId)), timeWaiting);

    var divElement = driver.findElement(By.id(mainDivId));
    divElement.findElements(By.tagName('ul'))
        .then(function (ulElements) {
            async.forEach(ulElements, function (ul) {
                ul.findElements(By.tagName('li'))
                    .then(function (liElements) {
                        async.forEach(liElements, function (li) {
                            li.getText().then(function (liVal) {
                                subjectMap.push(liVal);
                            });
                        });
                    });

            });
        }).then(function () {
        driver.quit();
        convertMap(subjectMap,callback);
    });
}
function convertMap(map,callback) {
    var subjectMapNew = {};
    map.some(function(item){
        var splits = item.split('(');
        if (splits.length !== 2) {
            console.log('err splits ', item);
            callback('splits err');
            return false;
        }
        subjectMapNew[splits[1].trim().replace(')', '')] = splits[0].trim();
    });
    callback(null,subjectMapNew);
}

exports.getMap = crawlSubjects;

