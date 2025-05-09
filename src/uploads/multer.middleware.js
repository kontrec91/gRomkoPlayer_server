// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import config from "./cloudinary.config.js";
// import { v2 as cloudinary } from "cloudinary";

// console.log("upload");

// const storage = new CloudinaryStorage({
//  cloudinary: cloudinary,
//  params: {
//   folder: "tracks",
//   //   allowedFormats: (req, res) => {
//   // //    console.log("Uploaded file:", req);
//   // //    console.log("RESPONSE:", res);

//   //    return ["mp3", "aac", "wav"];
//   //   },

//   allowedFormats: ["mp3", "aac", "wav"],
//  },
// });

// const upload = multer({ storage });

// export default upload;
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadPath = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadPath)) {
 fs.mkdirSync(uploadPath, { recursive: true });
}

// cloudinary.config({
//  cloud_name: process.env.CLOUDINARY_NAME,
//  api_key: process.env.CLOUDINARY_KEY,
//  api_secret: process.env.CLOUDINARY_SECRET,
// });

// const storage = new CloudinaryStorage({
//  cloudinary: cloudinary,
//  params: {
//   folder: "tracks",
//   format: async (req, file) => "mp3", // или другой формат
//   public_id: (req, file) => file.originalname.split(".")[0],
//  },
// });

const storage = multer.diskStorage({
 destination: (request, file, callback) => {
  // console.log("request", request);
//   console.log("FILE", file);
  //   console.log("callback", callback);

  console.log("Uploading to", uploadPath);

  callback(null, uploadPath);
  //   callback(null, "./../uploads");
 },
 //  fileName: (request, file, callback) => callback(null, file.originalFileName),

 filename: (req, file, cb) => {
  const ext = path.extname(file.originalname);
  const name = path.basename(file.originalname, ext).replace(/\s+/g, "_");
  cb(null, `${name}-${Date.now()}${ext}`);
 },
});

const upload = multer({ storage });

// const upload = multer({ storage }).single("file");

export default upload;
