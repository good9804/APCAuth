var express = require("express");
var router = express.Router();
const Image = require("../models/image");

router.post("/api/upload", async (req, res) => {
  console.log(req.files.file.data);
  const newimages = new Image({
    imgdata: req.files.file.data,
  });
  await newimages.save();
  res.json({ imgdata: new_images["imgdata"] });
});

router.get("/api/view", async (req, res) => {
  const imagelist = await Image.find({});
  res.json({ imglist: imagelist });
});

module.exports = router;
