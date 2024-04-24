const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/recipe-app");

/// User Registration
app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: "Duplicate email" });
  }
});
/// User Login
app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!user) {
      return { status: "error", error: "Invalid login" };
    }

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          email: user.email,
          name: user.name,
        },
        "secret123"
      );
      return res.json({ status: "ok", user: token });
    } else {
      return res.json({ status: "error", user: false });
    }
  } catch (error) {
    res.json({ status: "error", error: "Duplicate email" });
  }
});
/// Get User Info
app.get("/api/user", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await User.findOne({ email: email });

    return res.json({
      status: "ok",
      user: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});
/// User Upload Image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ status: "error", error: "No file uploaded" });
    }

    return res.json({ status: "ok", filename: req.file.filename });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", error: `Upload failed with ${error.message}` });
  }
});

app.get("/api/quote", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await User.findOne({ email: email });

    return res.json({ status: "ok", quote: user.quote });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "GET invalid token" });
  }
});

app.post("/api/quote", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    await User.updateOne({ email: email }, { $set: { quote: req.body.quote } });

    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

/// change password
app.post("/api/change-password", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await User.findOne({ email: email });
    const isPasswordValid = await bcrypt.compare(
      req.body.oldPassword,
      user.password
    );
    if (isPasswordValid) {
      const newPassword = await bcrypt.hash(req.body.newPassword, 10);
      await User.updateOne(
        { email: email },
        { $set: { password: newPassword } }
      );
      return res.json({ status: "ok" });
    } else {
      return res.json({ status: "error", error: "Invalid password" });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.listen("1337", () => console.log("Server is running on 1337"));
