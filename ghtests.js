const makeLabel = require("./index.js");
const fetch = require("node-fetch");
const repoExists = require("repo-exists");

function getstats(user, repo) {
  return new Promise(function (resolve, reject) {
    getbranch(user, repo).then(function (branch) {
      let stats = fetch(
        "https://api.github.com/repos/" +
          user +
          "/" +
          repo +
          "/commits/" +
          branch +
          "/status"
      )
        .then((res) => res.json())
        .then((json) => {
          resolve(json.state);
        });
    });
  });
}

function getexist(user, repo) {
  return new Promise(function (resolve, reject) {
    repoExists(user + "/" + repo, (error, exists) => {
      if (exists == true) {
        resolve(true);
      } else resolve(false);
    });
  });
}

function getbranch(user, repo) {
  return new Promise(function (resolve, reject) {
    let stats = fetch("https://api.github.com/repos/" + user + "/" + repo)
      .then((res) => res.json())
      .then((json) => {
        resolve(json.default_branch);
      });
  });
}

var labelgen = function labelgen(options) {
  // Start new Promise session
  return new Promise((resolve, reject) => {
    user = options.user || "nodejs";
    repo = options.repo || "node";
    labeloptions = options || {};
    // Get if users exist or not
    getexist(user, repo).then(function (res) {
      if (res == true) {
        // Repos Exist -> Get Status
        getstats(user, repo).then(function (out) {
          if (out == "success") {
            labeloptions.bgcolor = "#32a852";
          } else if (out == "pending") {
            labeloptions.bgcolor = "#fcba03";
          } else if (out == "error") {
            labeloptions.bgcolor = "#f5426c";
          } else if (out == "failure") {
            labeloptions.bgcolor = "#f5426c";
          }
          labeloptions.text = out;
          labeloptions.dimtheme = "true";
          output = makeLabel(labeloptions);
          resolve(output);
        });
      } else resolve("ERROR: Repos Does Not Exist"); // Repo Does Not Exist
    });
  });
};

module.exports = labelgen;
