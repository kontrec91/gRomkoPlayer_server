// import express from 'express';

// require("dotenv").config();

import express, { json } from "express";
// import https from "https";
// import fs from "fs";
import cors from "cors";
import userRouter from "./src/routes/user.routes.js";
// import fileRouter from "./src/routes/file.router.js";

const app = express();

const port = 3000;

//API upload: https://api.cloudinary.com/v1_1/dvi7qgmkb/auto/upload where dvi7qgmkb is my cloud name

// const options = {
//     key: fs.readFileSync('')
// }

app.use(
 cors({
  //   origin: "https://localhost:3001",
  origin: "http://localhost:3001",

  //   credentials: true, //access-control-allow-credentials:true
  //   optionSuccessStatus: 200,
 })
);
app.use(json());
console.log("app");
app.use("/api/user", userRouter);
// app.use("/api/file", fileRouter);

app.listen(port, () => {
 console.log(`Server is running on http://localhost:${port}`);
});

// Configuration
// cloudinary.config({
//  cloud_name: "dvi7qgmkb",
//  api_key: "161343698468232",
//  api_secret: process.env.API_SECRET,
// });

// const upload = multer({ storage: multer.memoryStorage() });

// app.post(
//  "https://api.cloudinary.com/v1_1/dvi7qgmkb/auto/upload",
//  upload.single("track"),
//  async (req, res) => {
//   try {
//    const result = await cloudinary.v2.uploader.upload(req.file.path, {
//     resource_type: "video", // Для аудио используем "video"
//     folder: "tracks",
//    });

//    res.json({ url: result.secure_url });
//   } catch (error) {
//    res.status(500).json({ error: "Upload failed" });
//   }
//  }
// );

// const https = require('https');
// const fs = require('fs');
// const express = require('express');
// const app = express();

// const options = {
//   key: fs.readFileSync('path/to/private-key.pem'),
//   cert: fs.readFileSync('path/to/certificate.pem'),
// };

// https.createServer(options, app).listen(443, () => {
//   console.log('Server is running on HTTPS');
// });
