import sequelize from "./../../db.js";
import { DataTypes } from "@sequelize/core";

const Users = sequelize.define(
 "users",
 {
  user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_name: { type: DataTypes.STRING },
  user_email: { type: DataTypes.STRING },
  user_password: { type: DataTypes.STRING },
 },

 {
  timestamps: false,
 }
);

export default Users;
