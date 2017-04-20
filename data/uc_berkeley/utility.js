/**
 * Created by william on 4/17/17.
 */
var fs = require('fs');
var crawlSubjectMap = require('../../crawler/uc_berkeley/get_subject_map');
var hack = require('../../crawler/uc_berkeley/uc_berkeley_hacker');
var local_param = require('../local_param');

function saveToLocal() {
    crawlSubjectMap.getMap(function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            console.log(Object.keys(data).length);
            fs.writeFile('./' + local_param.subjectMapFileName, JSON.stringify(data), function(err){
                if(err){
                    console.err(err);
                }
            });
        }
    });
}

function saveJsonSchedule(term){
    hack.hack(term,function(err,data){
       if(err){
           console.log(err);
       }
       else{
           var termDir = './' + term;
           if (!fs.existsSync(termDir)){
               fs.mkdirSync(termDir).then(function(){
                   fs.writeFile(termDir + '/rawData.json',JSON.stringify(data),function(err){
                       if(err){
                           console.log(err);
                       }
                   })
               });
           }
       }
    });
}

exports.saveJsonSchedule = saveJsonSchedule;
exports.saveSubjectMap = saveToLocal;