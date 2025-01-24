import { DataTypes } from "@sequelize/core";

import sequelize from "../../db.js";

const RefreshToken = sequelize.define(
 "refresh_tokens",
 {
  token_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, primaryKey: true },
  token: { type: DataTypes.STRING },
 },

 {
  timestamps: false,
 }
);

export default RefreshToken;
