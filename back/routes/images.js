var express = require("express");
var router = express.Router();
const Image = require("../models/image");

router.post("/api/upload", async (req, res) => {
  console.log(req.files.file.data);
  const new_images = new Image({
    imgdata: req.files.file.data,
  });
  await new_images.save();
  res.json({ imgdata: new_images["imgdata"] });
});

module.exports = router;
