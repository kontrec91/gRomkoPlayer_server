import Router from "express";
import trackController from "../controllers/track.controller.js";
import upload from "./../uploads/multer.middleware.js";

console.log("router");

const router = new Router();

// router.post(
//  "/upload",

//  //  upload.single("track"),

//  (req, res, next) => {
//   console.log("Multer middleware called");
//   upload(req, res, (err) => {
//    if (err) {
//     console.error("Multer error:", err);
//     return res.status(500).json({ error: "File upload failed", details: err });
//    }
//    console.log("File uploaded successfully");
//    next();
//   });
//  }

//  //  function (req, res) {
//  //   console.log('RESPONSE IN FUNC', res.json(req.file));
//  //  }

//  //  trackController.addTrack
// );

router.post("/upload", upload.single("file"), trackController.addTrack);

// router.post("/upload", trackController.addTrack);

// router.post("/upload", upload.single("file"), (req, res) => {
//  console.log("Uploaded file:", req.file);
//  if (!req.file) {
//   return res.status(400).json({ error: "File upload failed" });
//  }
//  res.json({ file: req.file });
// });

// router.post("/upload", upload.single("file"), (req, res) => {
//  console.log("Uploaded file:", req.file);
//  res.json({ message: "File uploaded successfully", file: req.file });
// });

export default router;
