require("dotenv").config();
var express = require("express");
var router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/api/signup", async (req, res) => {
  if (
    req.body.user.password == "" ||
    req.body.user.passwordcheck == "" ||
    req.body.user.username == "" ||
    req.body.user.userid == ""
  ) {
    res.json({
      success: false,
      message: "Fill the form!",
    });
  } else {
    if (req.body.user.password != req.body.user.passwordcheck) {
      res.json({
        success: false,
        message: "Check Password!",
      });
    } else {
      const users = await User.findOne({ userid: req.body.user.userid });
      console.log(req.body);
      console.log(Number(req.body.user.submitrole));
      if (users) {
        res.json({
          success: false,
          message: "Sign Up Failed Please use anoter ID",
        });
      } else {
        const salt = bcrypt.genSaltSync();
        const encryptedPassword = bcrypt.hashSync(req.body.user.password, salt);
        const new_users = new User({
          userid: req.body.user.userid,
          username: req.body.user.username,
          password: encryptedPassword,
          submitrole: req.body.user.submitrole,
        });
        await new_users.save();
        res.json({
          success: true,
          message: "Sing Up Success!",
        });
      }
    }
  }
});

router.get("/api/view/pending", async (req, res) => {
  const users = await User.find({ role: 2 });
  res.send(users);
});

router.get("/api/view/info", async (req, res) => {
  try {
    const refreshtoken = getCookiesInfo(req.headers["cookie"].split(";"))[
      "refreshtoken"
    ];
    //유저 조회 admin 권한
    const admins = await User.findOne({ refreshToken: refreshtoken });
    const users = await User.find({});
    if (admins.role === 0) res.send(users);
  } catch (err) {
    res.send({ message: "viewing Users Falied" });
  }
});

router.post("/api/delete", async (req, res) => {
  //유저 삭제
  try {
    await User.deleteOne({ userid: req.body.user.userid });
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.send(err);
  }
});

router.post("/api/approve", async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { userid: req.body.user.userid },
      { role: req.body.user.submitrole }
    );
    const users = await User.find({ role: 2 });
    res.send(users);
  } catch (err) {
    res.send(err);
  }
});

router.post("/api/decline", async (req, res) => {
  try {
    await User.deleteOne({ userid: req.body.user.userid });
    const users = await User.find({ role: 2 });
    res.send(users);
  } catch (err) {
    res.send(err);
  }
});

router.post("/api/login", async (req, res) => {
  if (req.body.user.password == "" || req.body.user.userid == "") {
    res.json({
      success: false,
      message: "Fill the form!",
    });
  } else {
    const users = await User.findOne({ userid: req.body.user.userid });
    if (users && users.role != 2) {
      const validPassword = await bcrypt.compare(
        req.body.user.password,
        users.password
      );
      if (validPassword) {
        //jwt.sign(payload, secretOrPrivateKey, [options, callback])
        const accesstoken = jwt.sign(
          {
            userid: users.userid,
          },
          process.env.SECRET_KEY,
          {
            algorithm: "HS256",
            expiresIn: "5s", // 만료시간 15분
          }
        );
        const refreshtoken = jwt.sign({}, process.env.SECRET_KEY2, {
          algorithm: "HS256",
          expiresIn: "1h", // 만료시간 1시간
        });
        await User.findOneAndUpdate(
          { userid: req.body.user.userid },
          { refreshToken: refreshtoken }
        );
        res.cookie("accesstoken", accesstoken, { httpOnly: true });
        res.cookie("refreshtoken", refreshtoken, { httpOnly: true });
        res.json({
          // 로그인 성공
          success: true,
          message: "Login Success!",
          userinfo: {
            loginUserId: users.userid,
            loginUserRole: users.role,
          },
        });
      } else {
        res.json({
          success: false,
          message: "Login failed please check your id or password!",
        });
      }
    } else {
      res.json({
        success: false,
        message: "Login failed! or pending state",
      });
    }
  }
});

router.get("/api/logout", async (req, res) => {
  try {
    res.clearCookie("accesstoken");
    res.clearCookie("refreshtoken");
    res.json({
      message: "logout",
    });
  } catch (err) {
    res.send(err);
  }
});

router.post("/api/update", async (req, res) => {
  const users = await User.findOne({ userid: req.body.user.userid });
  if (users) {
    const validPassword = await bcrypt.compare(
      req.body.user.password,
      users.password
    );
    if (validPassword) {
      const salt = bcrypt.genSaltSync();
      const encryptedPassword = bcrypt.hashSync(
        req.body.user.updatepassword,
        salt
      );
      await User.findOneAndUpdate(
        { userid: req.body.user.userid },
        {
          username: req.body.user.username,
          password: encryptedPassword,
        }
      );
      res.json({
        // 업데이트 성공
        message: "update success",
        user: users,
      });
    } else {
      res.json({
        // 비밀번호 불일치
        message: "check your password!",
      });
    }
  } else {
    res.json({
      message: "failed",
    });
  }
});

router.get("/api/verify/access", async (req, res, next) => {
  try {
    const accesstoken = getCookiesInfo(req.headers["cookie"].split(";"))[
      "accesstoken"
    ];
    jwt.verify(accesstoken, process.env.SECRET_KEY);
    res.json({ message: "접속 성공" });
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get("/api/verify/refresh", async (req, res, next) => {
  try {
    const refreshtoken = getCookiesInfo(req.headers["cookie"].split(";"))[
      "refreshtoken"
    ];
    jwt.verify(refreshtoken, process.env.SECRET_KEY2);
    const users = await User.findOne({ refreshToken: refreshtoken });
    const accesstoken = jwt.sign(
      {
        userid: users.userid,
      },
      process.env.SECRET_KEY,
      {
        algorithm: "HS256",
        expiresIn: "5s", // 만료시간 15분
      }
    );
    const new_refreshtoken = jwt.sign({}, process.env.SECRET_KEY2, {
      algorithm: "HS256",
      expiresIn: "1h", // 만료시간 1시간
    });
    await User.findOneAndUpdate(
      { refreshToken: refreshtoken },
      { refreshToken: new_refreshtoken }
    );
    res.cookie("accesstoken", accesstoken, { httpOnly: true });
    res.cookie("refreshtoken", new_refreshtoken, { httpOnly: true });
    res.json({ message: "유효기간 만료 되어 재발급합니다.", user: users });
  } catch (err) {
    res.send({ message: "재 로그인이 필요합니다." });
  }
});

router.post("/api/import/view", async (req, res) => {
  try {
    var userinfo;
    userinfo = await User.find({ userid: req.body.userid });
    res.json({ importHistoryList: userinfo[0].import_history });
  } catch (err) {
    res.send(err);
  }
});

function getCookiesInfo(cookie) {
  const obj = {};
  cookie.forEach((item) => {
    // '='으로 분리
    const elem = item.split("=");
    // 키 가져오기
    const key = elem[0].trim();
    // 값 가져오기
    const val = decodeURIComponent(elem[1]);
    // 저장
    obj[key] = val;
  });
  return obj;
}
module.exports = router;
