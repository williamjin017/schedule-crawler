/**
 * Created by william on 4/16/17.
 */
var util = require('./utility');
var Promise = require('bluebird');
var process = require('process');

var promiseWhile = function (condition, action) {
    var resolver = Promise.defer();

    var loop = function () {
        if (!condition()) return resolver.resolve();
        return Promise.cast(action())
            .then(loop)
            .catch(resolver.reject);
    };

    process.nextTick(loop);
    return resolver.promise;
};

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

const homePage = 'http://classes.berkeley.edu/';


//elements
var termDivId = 'block-facetapi-whpdnmtop9dauuqtyvlh3nghzqxboyoh';
var loadMoreButtonClass = 'load-more-button';
var jsonDataClass = 'hbrdata-processed';
var dataJson = {
    results: []
};

driver.get(homePage);

function hack(term, callback) {
    termButton(term, function (err, data) {
        var selectTermId = data;
        driver.findElement(By.id(selectTermId)).click();
        driver.wait(until.elementLocated(By.className(loadMoreButtonClass)), 8000);
        var olIndex = 2;
        promiseWhile(function () {
            var isVisible;
            isLoadVisible(function(visible){
                isVisible = visible;
            });
        }, function () {
            return new Promise(function (resolve, reject) {
                driver.findElement(By.className(loadMoreButtonClass)).click();
                var olXpath = '/html/body/div/div[2]/main/div/ol[' + olIndex + ']';
                olIndex++;
                driver.wait(until.elementLocated(By.xpath(olXpath)), 3000);
                driver.findElement(By.xpath(olXpath)).then(function (ol) {
                    //retrieve class json object
                    ol.findElements(By.className(jsonDataClass)).then(function (divs) {
                        console.log(divs.length);
                        divs.forEach(function (div) {
                            div.getAttribute('data-json').then(function (jsonVal) {
                                var jsonF = JSON.parse(jsonVal);
                                console.log(jsonF.id);
                                dataJson.results.push(jsonF);
                            });
                        });
                    }).thenFinally(function () {
                        // console.log(ol);
                        resolve();
                    });
                });
            });
        }).then(function () {
            console.log("all done");
            console.log('quitting...');
            driver.quit();
            callback(null, dataJson);
        });
    });
}


function termButton(term, callback) {
    var targetTermId = null;
    var curTerm = util.getTerm(term);
    var check = false;
    console.log(curTerm);
    driver.findElement(By.id(termDivId)).then(function (termDiv) {
        termDiv.findElements(By.tagName('li')).then(function (lis) {
            lis.some(function (li) {
                li.getText().then(function (liVal) {
                    if (liVal.indexOf(curTerm) >= 0 && !check) {
                        check = true;
                        li.findElement(By.tagName('input')).then(function (inputElem) {
                            inputElem.getAttribute('id').then(function (inputId) {
                                targetTermId = inputId;
                            });
                        });
                        return true;
                    }
                });
            });
        }).thenFinally(function () {
            console.log(targetTermId);
            callback(null, targetTermId);
        });
    });
}

function isLoadVisible(callback){
    var isVisible = false;
    driver.findElements(By.className(loadMoreButtonClass)).then(function(elems){
        isVisible = elems.length != 0;
    }).thenFinally(function(){
       callback(isVisible);
    });
}

exports.hack = hack;

