const express = require("express");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");

const app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));
const upload = multer({ dest: "./public/uploads/" });

//  Routes GET & POST
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), function (req, res) {
  const { originalname, mimetype, size } = req.file;
  res.json({
    name: originalname,
    type: mimetype,
    size: size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
