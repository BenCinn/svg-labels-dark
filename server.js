const exp = require("express");
const app = exp();
const makeLabel = require(".");
const labelGen = require("./ghtests");

app
  .get("/svg", (req, res) => {
    res.set("Content-Type", "image/svg+xml");
    res.set("Cache-control", "public, max-age=7889400, s-maxage=7889400");
    res.send(makeLabel(req.query));
  })
  .get("/", (req, res) => {
    res.sendFile(__dirname + "/docs/index.html");
  })
  .get("/tests", (req, res) => {
    res.set("Content-Type", "image/svg+xml");
    res.set("Cache-control", "public, max-age=300, s-maxage=300");
    let username = req.query.user || "nodejs";
    let repo = req.query.repo || "node";
    let dim = req.query.dimtheme || "false";
    labelGen({ user: username, repo: repo, dimtheme: dim }).then(function (output) {
      res.send(output);
    });
  });
var port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log("Express is listening to http://localhost:" + port)
);
