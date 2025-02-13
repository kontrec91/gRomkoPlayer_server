import pkg from "jsonwebtoken";
const { sign } = pkg;

export const generateToken = (user, secretKey, time) => {
 console.log(user, secretKey, time);
 return sign(
  {
   id: user.user_id,
   email: user.user_email,
   name: user.user_name,
  },
  secretKey,
  { expiresIn: time }
 );
};
