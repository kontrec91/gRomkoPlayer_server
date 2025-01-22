import pkg from "jsonwebtoken";
const { sign } = pkg;

export const generateAccessToken = (payload) =>
 sign(
  {
   id: payload.user_id,
   email: payload.user_email,
   name: payload.user_name,
  },
  process.env.ACCESS_TOKEN_SECRET,
  { expiresIn: "15m" }
 );

export const generateRefreshToken = (payload) =>
 sign(
  {
   id: payload.user_id,
   email: payload.user_email,
   name: payload.user_name,
  },
  process.env.REFRESH_TOKEN_SECRET,
  { expiresIn: "7d" }
 );
