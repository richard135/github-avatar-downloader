var request = require('request');
var GITHUB_USER = "richard135";
var GITHUB_TOKEN = "31dda3a1ee7b79cd1419a665e8589d63cbbbe825"
console.log('Welcome to the GitHub Avatar Downloader!');

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

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  for (avatar of result) {
    console.log(avatar.avatar_url);
  }
});