import { hash, compare } from "bcrypt";
// import pool from "../../db.js";
import pkg from "jsonwebtoken";
const { sign, verify } = pkg;
import "dotenv/config";

import { Op } from "@sequelize/core";
import Users from "../models/User.model.js";

// import Users from "../models/User.model";
// const sequelize = new Sequelize({
//  database: "music_player", //db table name
//  user: "postgres", //user who get permission to db
//  password: "123", // password for user named postgres
//  host: "localhost",
//  port: 5432,
//  dialect: "postgres", //db name
//  ssl: true, // turn on the SSL
//  clientMinMessages: "notice", // `client_min_messages` session parameter. Detect the client message level from the server
//  logging: false, // for customizing the log which sequelize will create for every SQL query it performs. Not necessary
//  ssl: {
//   require: true, // require for all actions with db
//   rejectUnauthorized: false, //  let to ignore the verification of server certificate
//  },
// });

// const Users = sequelize.define(
//  "users",
//  {
//   user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   user_name: { type: DataTypes.STRING },
//   user_email: { type: DataTypes.STRING },
//   user_password: { type: DataTypes.STRING },
//  },

//  {
//   timestamps: false,
//  }
// );

// sequelize
//  .authenticate()
//  .then(() => {
//   console.log("Connection has been established successfully.");
//  })
//  .catch((err) => {
//   console.error("Unable to connect to the database:", err);
//  });

class userController {
 async createUser(req, res) {
  const { user_name, user_email, user_password } = req.body;
  if (!user_email || !user_name || !user_password) {
   return res.status(400).json({ message: "Missing required fields" });
  }

  const userExists = await Users.findOne({
   where: { [Op.or]: { user_email, user_name } },
  });
  console.log("userExists", userExists);
  if (userExists) {
   return res.status(400).json({ message: "Email or name is already exists" });
  }

  const hashedPassword = await hash(user_password, 10);

  const newUser = await Users.create({
   user_email,
   user_name,
   user_password: hashedPassword,
  });

  console.log("newUser", newUser);

  return res.status(200).json(newUser);
 }

 //  async createUser(req, res) {
 //   const { user_name, user_email, user_password } = req.body;
 //   if (!user_name || !user_email || !user_password) {
 //    return res.status(400).json({ error: "Missing required fields" });
 //   }

 //   const userExists = await pool.query(
 //    `SELECT * FROM users WHERE user_email = $1`,
 //    [user_email]
 //   );

 //   if (userExists.rows[0]) {
 //    return res.status(400).json({ message: "Email is already exist" });
 //   }

 //   const hashedPassword = await hash(user_password, 10);

 //   const newPerson = await pool.query(
 //    `INSERT INTO users(user_name, user_email, user_password) values($1, $2,$3) RETURNING *`,
 //    [user_name, user_email, hashedPassword]
 //   );
 //   console.log("NEW USER response", newPerson.rows[0]);

 //   res.json(newPerson.rows[0]);
 //  }

 //  async getUsers(req, res) {
 //   const users = await pool.query(`SELECT * FROM users`);
 //   res.json(users.rows);
 //  }

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
  const token = sign(
   {
    id: currentUserId,
    email: currentUserEmail,
    name: currentUserName,
   },
   process.env.JWT_SECRET,
   { expiresIn: "1h" }
  );
  return res.status(200).json({ message: `Bearer ${token}` });
 }

 //  async getOneUser(req, res) {
 //   const { user_email, user_password } = req.body;

 //   const user = await pool.query(`SELECT * FROM users WHERE user_email = $1`, [
 //    user_email,
 //   ]);

 //   if (!user.rows[0]) {
 //    return res
 //     .status(400)
 //     .json({ message: "Invalid email or password. Please try again." });
 //   }

 //   const isPasswordsMatch = await compare(
 //    user_password,
 //    user.rows[0].user_password
 //   );

 //   if (!isPasswordsMatch) {
 //    return res
 //     .status(401)
 //     .json({ message: "Incorrect password. Please try again." });
 //   }

 //   const { user_name, user_id } = user.rows[0];
 //   console.log("jwt", process.env.JWT_SECRET);
 //   const token = sign(
 //    {
 //     email: user_email,
 //     id: user_id,
 //     name: user_name,
 //    },
 //    process.env.JWT_SECRET,
 //    { expiresIn: 60 * 60 }
 //   );
 //   console.log(token);
 //   //   res.status(200).json(user.rows[0]);
 //   res.status(200).json({ token: `Bearer ${token}` });
 //  }

 //  async updateUser(req, res) {
 //   const { user_name, user_id, user_password } = req.body;
 //   const user = await pool.query(
 //    `UPDATE users SET user_name = $1, user_password = $2 WHERE user_id = $3 RETURNING *`,
 //    [user_name, user_password, user_id]
 //   );
 //   res.json(user.rows[0]);
 //  }
 //  async deleteUser(req, res) {
 //   const id = req.params.id;
 //   console.log(req.params);
 //   const user = await pool.query(
 //    `DELETE FROM users W
 //    HERE user_id = $1 RETURNING *`,
 //    [id]
 //   );
 //   console.log(req.params);
 //   res.json(user.rows[0]);
 //  }
}

export default new userController();
