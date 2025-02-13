import { hash, compare } from "bcrypt";
import "dotenv/config";

import { Op } from "@sequelize/core";
import Users from "../models/User.model.js";
import { generateToken } from "../utils/tokens.js";
import RefreshToken from "../models/RefreshToken.model.js";

class userController {
 async createUser(req, res) {
  const { user_name, user_email, user_password } = req.body;
  const userExists = await Users.findOne({
   where: { [Op.or]: { user_email, user_name } },
  });

  if (userExists) {
   return res.status(400).json({ message: "Email or name is already exists" });
  }

  const hashedPassword = await hash(user_password, 10);

  const newUser = await Users.create({
   user_email,
   user_name,
   user_password: hashedPassword,
  });

  //create tokens
  const accessToken = generateToken(
   newUser,
   process.env.ACCESS_TOKEN_SECRET,
   "15min"
  );
  const refreshToken = generateToken(
   newUser,
   process.env.REFRESH_TOKEN_SECRET,
   "7d"
  );

  await RefreshToken.create({
   user_id: newUser.user_id,
   token: refreshToken,
  });

  return res.status(200).json({
   accessToken,
   refreshToken,
  });
 }

 async getOneUser(req, res) {
  const { user_email, user_password } = req.body;
  const currentUser = await Users.findOne({ where: { user_email } });
  if (!currentUser) {
   return res
    .status(400)
    .json({ message: "Invalid email or password. Please try again" });
  }

  const {
   user_name: currentUserName,
   user_email: currentUserEmail,
   user_id: currentUserId,
   user_password: currentUserPassword,
  } = currentUser.dataValues;

  const isPasswordsMatch = await compare(user_password, currentUserPassword);

  if (!isPasswordsMatch) {
   return res
    .status(401)
    .json({ message: "Incorrect password. Please try again" });
  }

  const accessToken = generateToken(
   currentUser.dataValues,
   process.env.ACCESS_TOKEN_SECRET,
   "15min"
  );
  const refreshToken = generateToken(
   currentUser.dataValues,
   process.env.REFRESH_TOKEN_SECRET,
   "7d"
  );

  const existRefreshToken = await RefreshToken.findOne({
   where: { user_id: currentUserId },
  });

  if (existRefreshToken) {
   await RefreshToken.update(
    { token: refreshToken },
    { where: { user_id: currentUserId } }
   );
  } else {
   await RefreshToken.create({
    user_id: currentUserId,
    token: refreshToken,
   });
  }
  return res.status(200).json({ accessToken, refreshToken });
 }

 async logout(req, res) {
  console.log("REQUEST", req.body);
  const refreshToken = await RefreshToken.destroy({
   where: {
    token: req.body.token,
   },
  });
  console.log("refreshToken", refreshToken);
  if (refreshToken) {
   return res.sendStatus(204);
  }
  return res.status(400).json({ message: "Something went`s wrong" });
 }
}

export default new userController();

// refresh access token, --- before need to validate access token
// const isValidRefreshToken = async (token) => {
//     const result = await db.query('SELECT * FROM refresh_tokens WHERE token = $1', [token]);
//     return result.rows.length > 0;
// };

// 3. get new access token
// app.post('/token', (req, res) => {
//     const refreshToken = req.body.token;
//     if (!refreshToken) return res.sendStatus(401);
//     if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403);
//         const accessToken = generateAccessToken({ name: user.name });
//         res.json({ accessToken });
//     });
// });

// 4, check token
// const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (!token) return res.sendStatus(401);

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403);
//         req.user = user;
//         next();
//     });
// };

// 5. Example of a protected route:
// app.get('/protected', authenticateToken, (req, res) => {
//     res.send(`Hello, ${req.user.name}`);
// });
