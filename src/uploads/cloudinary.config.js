import { v2 as cloudinary } from "cloudinary";

import "dotenv/config";

const config = cloudinary.config({
 cloud_name: process.env.CLOUDINARY_NAME,
 api_key: process.env.CLOUDINARY_KEY,
 api_secret: process.env.CLOUDINARY_SECRET,
 secure: true,
 use_filename: true,
 unique_filename: false,
 overwrite: true,
 folder: "tracks",
 resource_type: "video",
 eager: [
  { width: 300, height: 300, crop: "pad", audio_codec: "none" },
  {
   width: 160,
   height: 100,
   crop: "crop",
   gravity: "south",
   audio_codec: "none",
  },
 ],
 eager_async: true,
});

// console.log(cloudinary.config());

export default config;
