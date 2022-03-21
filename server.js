const exp = require("express");
const app = exp();
const makeLabel = require(".");

app
  .get("/svg", (req, res) => {
    res.set("Content-Type", "image/svg+xml");
    res.send(makeLabel(req.query));
  })
  .get("/", (req, res) => {
    res.sendFile(__dirname + "/docs/index.html");
  });
var port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log("Express is listening to http://localhost:" + port)
);
