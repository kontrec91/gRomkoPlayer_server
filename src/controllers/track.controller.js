// // import cloudinary from "cloudinary";
// // import multer from "multer";
// // import Tracks from "../models/Track.model.js";

// // const upload = multer({ storage: multer.memoryStorage() });

// // cloudinary.config({
// //  cloud_name: process.env.CLOUDINARY_NAME,
// //  api_key: process.env.CLOUDINARY_KEY,
// //  api_secret: process.env.CLOUDINARY_SECRET,
// // });

// // class trackController {
// //  async addTrack(res, req) {
// //   const { track, user_id } = req.body;

// //   try {
// //    const newTrack = await Tracks.create({
// //     original_file_name: "Test",
// //     url: "/url",
// //     user_id,
// //    });
// //    return res.sendStatus(200);
// //   } catch (error) {
// //    return res.status(500).json({ message: "Upload failed" });
// //   }

// // app.post(
// //  "https://api.cloudinary.com/v1_1/dvi7qgmkb/auto/upload",
// //  upload.single("track"),
// //  async (req, res) => {
// //   try {
// //    const result = await cloudinary.v2.uploader.upload(req.file.path, {
// //     resource_type: "video", // Для аудио используем "video"
// //     folder: "tracks",
// //    });

// //    res.json({ url: result.secure_url });
// //   } catch (error) {
// //    res.status(500).json({ error: "Upload failed" });
// //   }
// //  }
// // );
// //  }
// // }

// // export default new trackController();

// import upload from "./../uploads/uploadMiddleware.js";

// import express, { json } from "express";

// const app = express();
// console.log("fileController");

// class fileController {
//  async addFile(res, req) {
//   console.log("upload");

//   try {
//    const { file } = req.file;
//    app.post("/upload", upload.single("file"), (req, res) =>
//     res.status(200).json({ url: req.file.path })
//    );
//   } catch (error) {
//    console.log("error");
//    return res.json({ message: "Файл не загружен" });
//   }
//  }
// }

// export default new fileController();




class FileController {
  async addFile(req, res) {
    try {
      console.log("Файл загружается...");
      
      if (!req.file) {
        return res.status(400).json({ message: "Файл не загружен" });
      }
      
      res.status(200).json({ url: req.file.path });
    } catch (error) {
      console.error("Ошибка загрузки файла:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }
}

export default new FileController();

