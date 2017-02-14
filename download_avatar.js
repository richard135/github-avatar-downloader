var request = require('request');
var fs = require('fs');
var GITHUB_USER = "richard135";
var GITHUB_TOKEN = "31dda3a1ee7b79cd1419a665e8589d63cbbbe825"
var myArgs = process.argv.slice(2);


function getRepoContributors(repoOwner, repoName, cb){
  var requestURL =  { url: ('https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' +repoOwner + '/' + repoName + '/contributors'),
                      headers: {
                        'User-Agent': "GitHub Avatar Downloader - Student Project"
                      }
                    }
  request(requestURL, function(err, response, body) {
    if (err || response.statusCode !=200) throw err;
    var parsed = JSON.parse(body);
    cb(err, parsed);
  });
}

function downloadImageByURL(url, filePath){
  request.get(url)               // Note 1
       .on('error', function (err) {                                   // Note 2
         throw err;
       })
       .on('response', function (response) {                           // Note 3
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream('avatar/'+filePath+'.jpg'));
}



getRepoContributors(myArgs[0], myArgs[1], function(err, result) {
  console.log("Errors:", err);
  for (avatar of result) {
    downloadImageByURL(avatar.avatar_url, avatar.login);
  }
});


