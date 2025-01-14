// import express from 'express';

// require("dotenv").config();

import express, { json } from "express";
import https from "https";
import fs from "fs";
import cors from "cors";
import userRouter from "./src/routes/user.routes.js";

import multer from "multer"; //for uploading file

const app = express();

const port = 3000;

// const options = {
//     key: fs.readFileSync('')
// }

app.use(cors({ origin: "https://localhost:3001" }));
app.use(json());
app.use("/api/user", userRouter);

app.listen(port, () => {
 console.log(`Server is running on http://localhost:${port}`);
});

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
