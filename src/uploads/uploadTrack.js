import config from "./cloudinary.config.js";
import { v2 as cloudinary } from "cloudinary";

const uploadTrack = async (trackPath) => {
 try {
  const result = await cloudinary.uploader.upload(trackPath, config);
//   console.log("result", result);
  return {
   public_id: result.public_id,
   url: result.secure_url,
  };
 } catch (error) {
  console.error(error);
 }
};

export default uploadTrack;
