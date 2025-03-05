import { DataTypes } from "@sequelize/core";

import sequelize from "../../db.js";

const RefreshToken = sequelize.define(
 "refresh_tokens",
 {
  token_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: {
   type: DataTypes.INTEGER,
   allowNull: false,
   primaryKey: true,
   references: {
    model: "users",
    key: "user_id",
   },
  },
  token: { type: DataTypes.STRING },
 },

 {
  timestamps: false,
 }
);

export default RefreshToken;
