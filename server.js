const exp = require("express");
const app = exp();
const makeLabel = require(".");
const labelgen = require("./ghtests");
const labelGen = require("./ghtests");

app
  .get("/svg", (req, res) => {
    res.set("Content-Type", "image/svg+xml");
    res.send(makeLabel(req.query));
  })
  .get("/", (req, res) => {
    res.sendFile(__dirname + "/docs/index.html");
  })
  .get("/tests", (req, res) => {
    res.set("Content-Type", "image/svg+xml");
    let username = req.query.user || "nodejs";
    let repo = req.query.repo || "node";
    labelGen({ user: username, repo: repo }).then(function (output) {
      res.send(output);
    });
  });
/*labelgen({ user: "BenCinn", repo: "Node-Server" }).then(function (res) {
  console.log(res);
});*/
var port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log("Express is listening to http://localhost:" + port)
);
