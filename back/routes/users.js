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
    req.body.user.password_check == "" ||
    req.body.user.user_name == "" ||
    req.body.user.user_id == ""
  ) {
    res.json({
      success: false,
      message: "Fill the form!",
    });
  } else {
    if (req.body.user.password != req.body.user.password_check) {
      res.json({
        success: false,
        message: "Check Password!",
      });
    } else {
      const users = await User.findOne({ user_id: req.body.user.user_id });
      console.log(req.body);
      console.log(Number(req.body.user.submit_role));
      if (users) {
        res.json({
          success: false,
          message: "Sign Up Failed Please use anoter ID",
        });
      } else {
        const salt = bcrypt.genSaltSync();
        const encrypted_password = bcrypt.hashSync(
          req.body.user.password,
          salt
        );
        const new_users = new User({
          user_id: req.body.user.user_id,
          user_name: req.body.user.user_name,
          password: encrypted_password,
          submit_role: req.body.user.submit_role,
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
    const refresh_token = getCookiesInfo(req.headers["cookie"].split(";"))[
      "refresh_token"
    ];
    //유저 조회 admin 권한
    const admins = await User.findOne({ refresh_token: refresh_token });
    const users = await User.find({});
    if (admins.role === 0) res.send(users);
  } catch (err) {
    res.send({ message: "viewing Users Falied" });
  }
});

router.post("/api/delete", async (req, res) => {
  //유저 삭제
  try {
    await User.deleteOne({ user_id: req.body.user.user_id });
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.send(err);
  }
});

router.post("/api/approve", async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { user_id: req.body.user.user_id },
      { role: req.body.user.submit_role }
    );
    const users = await User.find({ role: 2 });
    res.send(users);
  } catch (err) {
    res.send(err);
  }
});

router.post("/api/decline", async (req, res) => {
  try {
    await User.deleteOne({ user_id: req.body.user.user_id });
    const users = await User.find({ role: 2 });
    res.send(users);
  } catch (err) {
    res.send(err);
  }
});

router.post("/api/login", async (req, res) => {
  if (req.body.user.password == "" || req.body.user.user_id == "") {
    res.json({
      success: false,
      message: "Fill the form!",
    });
  } else {
    const users = await User.findOne({ user_id: req.body.user.user_id });
    if (users && users.role != 2) {
      const valid_password = await bcrypt.compare(
        req.body.user.password,
        users.password
      );
      if (valid_password) {
        //jwt.sign(payload, secretOrPrivateKey, [options, callback])
        const access_token = jwt.sign(
          {
            user_id: users.user_id,
          },
          process.env.SECRET_KEY,
          {
            algorithm: "HS256",
            expiresIn: "5s", // 만료시간 15분
          }
        );
        const refresh_token = jwt.sign({}, process.env.SECRET_KEY2, {
          algorithm: "HS256",
          expiresIn: "1h", // 만료시간 1시간
        });
        await User.findOneAndUpdate(
          { user_id: req.body.user.user_id },
          { refresh_token: refresh_token }
        );

        res.cookie("access_token", access_token, { httpOnly: true });
        res.cookie("refresh_token", refresh_token, { httpOnly: true });
        res.json({
          // 로그인 성공
          success: true,
          message: "Login Success!",
          user_info: {
            login_user_id: users.user_id,
            login_user_role: users.role,
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
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.json({
      message: "logout",
    });
  } catch (err) {
    res.send(err);
  }
});

router.post("/api/update", async (req, res) => {
  const users = await User.findOne({ user_id: req.body.user.user_id });
  if (users) {
    const valid_password = await bcrypt.compare(
      req.body.user.password,
      users.password
    );
    if (valid_password) {
      const salt = bcrypt.genSaltSync();
      const encrypted_password = bcrypt.hashSync(
        req.body.user.update_password,
        salt
      );
      await User.findOneAndUpdate(
        { user_id: req.body.user.user_id },
        {
          user_name: req.body.user.user_name,
          password: encrypted_password,
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
    const access_token = getCookiesInfo(req.headers["cookie"].split(";"))[
      "access_token"
    ];
    jwt.verify(access_token, process.env.SECRET_KEY);
    res.json({ message: "접속 성공" });
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get("/api/verify/refresh", async (req, res, next) => {
  try {
    const refresh_token = getCookiesInfo(req.headers["cookie"].split(";"))[
      "refresh_token"
    ];
    jwt.verify(refresh_token, process.env.SECRET_KEY2);
    const users = await User.findOne({ refresh_token: refresh_token });
    const access_token = jwt.sign(
      {
        user_id: users.user_id,
      },
      process.env.SECRET_KEY,
      {
        algorithm: "HS256",
        expiresIn: "5s", // 만료시간 15분
      }
    );
    const new_refresh_token = jwt.sign({}, process.env.SECRET_KEY2, {
      algorithm: "HS256",
      expiresIn: "1h", // 만료시간 1시간
    });
    await User.findOneAndUpdate(
      { refresh_token: refresh_token },
      { refresh_token: new_refresh_token }
    );
    res.cookie("access_token", access_token, { httpOnly: true });
    res.cookie("refresh_token", new_refresh_token, { httpOnly: true });
    res.json({ message: "유효기간 만료 되어 재발급합니다.", user: users });
  } catch (err) {
    res.send({ message: "재 로그인이 필요합니다." });
  }
});

router.post("/api/import/view", async (req, res) => {
  try {
    var user_info;
    user_info = await User.find({ user_id: req.body.user_id });
    res.json({ import_history_list: user_info[0].import_history });
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
