// Require the cloudinary library
// import { v2 as cloudinary } from "cloudinary";
// import config from "./src/uploads/cloudinary.config.js";
// import "dotenv/config";

import uploadTrack from "./src/uploads/uploadTrack.js";

// // Return "https" URLs by setting secure: tru
// cloudinary.config({
//  cloud_name: process.env.CLOUDINARY_NAME,
//  api_key: process.env.CLOUDINARY_KEY,
//  api_secret: process.env.CLOUDINARY_SECRET,

//  //  cloud_name: "dvi7qgmkb",
//  //  api_key: "161343698468232",
//  //  api_secret: "npRCfNudht0I08hpASogm0ukGh8",
//  secure: true,
// });

// // Log the configuration
// console.log(cloudinary.config());

/////////////////////////
// Uploads an image file
/////////////////////////
// const uploadImage = async (imagePath) => {
//  // Use the uploaded file's name as the asset's public ID and
//  // allow overwriting the asset with new versions
//  const options = {
//   use_filename: true,
//   unique_filename: false,
//   overwrite: true,
//   folder: "tracks",
//  };

//  try {
//   // Upload the image
//   const result = await cloudinary.uploader.upload(imagePath, options);
//   console.log(result);
//   return result.public_id;
//  } catch (error) {
//   console.error(error);
//  }
// };

// const uploadTrack = async (imagePath) => {
//  // Use the uploaded file's name as the asset's public ID and
//  // allow overwriting the asset with new versions
//  //  const options = {
//  //   use_filename: true,
//  //   unique_filename: false,
//  //   overwrite: true,
//  //   folder: "tracks",
//  //   resource_type: "video",
//  //   eager: [
//  //    { width: 300, height: 300, crop: "pad", audio_codec: "none" },
//  //    {
//  //     width: 160,
//  //     height: 100,
//  //     crop: "crop",
//  //     gravity: "south",
//  //     audio_codec: "none",
//  //    },
//  //   ],
//  //   eager_async: true,
//  //  };

//  try {
//   // Upload the image
//   const result = await cloudinary.uploader.upload(imagePath, config);
//   console.log(result);
//   return result.public_id;
//  } catch (error) {
//   console.error(error);
//  }
// };

/////////////////////////////////////
// Gets details of an uploaded image
/////////////////////////////////////
// const getAssetInfo = async (publicId) => {
//  // Return colors in the response
//  const options = {
//   colors: true,
//  };

//  try {
//   // Get details about the asset
//   const result = await cloudinary.api.resource(publicId, options);
//   console.log(result);
//   return result.colors;
//  } catch (error) {
//   console.error(error);
//  }
// };

//////////////////////////////////////////////////////////////
// Creates an HTML image tag with a transformation that
// results in a circular thumbnail crop of the image
// focused on the faces, applying an outline of the
// first color, and setting a background of the second color.
//////////////////////////////////////////////////////////////
// const createImageTag = (publicId, ...colors) => {
//  // Set the effect color and background color
//  const [effectColor, backgroundColor] = colors;

//  // Create an image tag with transformations applied to the src URL
//  let imageTag = cloudinary.image(publicId, {
//   transformation: [
//    { width: 250, height: 250, gravity: "faces", crop: "thumb" },
//    { radius: "max" },
//    { effect: "outline:10", color: effectColor },
//    { background: backgroundColor },
//   ],
//  });

//  return imageTag;
// };

//////////////////
//
// Main function
//
//////////////////
(async () => {
 // Set the image to upload
 const imagePath =
  //   "https://cloudinary-devs.github.io/cld-docs-assets/assets/images/happy_people.jpg";
  //   "./../../../Загрузки/apple.png";
  //   "./../my-app/public/Король и Шут - Ведьма и Осел.mp3";
  "./../my-app/public/t-rex-roar.mp3";

 // Upload the image
 //  const publicId = await uploadImage(imagePath);
 const publicId = await uploadTrack(imagePath);

 // Get the colors in the image
 //  const colors = await getAssetInfo(publicId);

 // Create an image tag, using two of the colors in a transformation
 //  const imageTag = await createImageTag(publicId, colors[0][0], colors[1][0]);

 // Log the image tag to the console
 //  console.log(imageTag);
 console.log("publicId", publicId);
})();

// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// cloudinary.config({
//  cloud_name: process.env.CLOUDINARY_NAME,
//  api_key: process.env.CLOUDINARY_KEY,
//  api_secret: process.env.CLOUDINARY_SECRET,
//  secure: true,
//  use_filename: true,
//  unique_filename: false,
//  overwrite: true,
//  folder: "tracks",
//  resource_type: "video",
//  eager: [
//   { width: 300, height: 300, crop: "pad", audio_codec: "none" },
//   {
//    width: 160,
//    height: 100,
//    crop: "crop",
//    gravity: "south",
//    audio_codec: "none",
//   },
//  ],
//  eager_async: true,
// });

// cloudinary.uploader
//  .upload("./../my-app/public/t-rex-roar.mp3", {
//   resource_type: "video",
//   folder: "tracks",
//  })
//  .then((result) => console.log("Upload success:", result))
//  .catch((error) => console.error("Upload error:", error));
