require('dotenv').config()
var request = require('request');

var fs = require('fs');
var GITHUB_USER = process.env.GITHUB_USER;
var GITHUB_TOKEN = process.env.GITHUB_TOKEN;
var myArgs = process.argv.slice(2);


function getRepoContributors(repoOwner, repoName, cb){
  var requestURL =  { url: ('https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors'),
    headers: {'User-Agent': "GitHub Avatar Downloader - Student Project"}};
  request(requestURL, function(err, response, body) {
    var parsed = JSON.parse(body);
    cb(err, parsed);
  });
}

function downloadImageByURL(url, filePath){
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream('avatar/' + filePath + '.jpg'));
}



getRepoContributors(myArgs[0], myArgs[1], function(err, result) {
  if (myArgs[0] === undefined) {
    return console.log("Please enter the repo owner followed by repo name");
  }
  console.log("Errors:", err);
  for (avatar of result) {
    downloadImageByURL(avatar.avatar_url, avatar.login);
  }
});


