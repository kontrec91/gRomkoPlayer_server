import { hash, compare } from "bcrypt";
import "dotenv/config";

import { Op } from "@sequelize/core";
import Users from "../models/User.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/tokens.js";
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
  const accessToken = generateAccessToken(newUser);
  const refreshToken = generateRefreshToken(newUser);

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

  const accessToken = generateAccessToken(currentUser.dataValues);
  const refreshToken = generateRefreshToken(currentUser.dataValues);

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
  } // maybe it not necessary because token must be in db after registration

  return res.status(200).json({ accessToken, refreshToken });
 }
}

export default new userController();
