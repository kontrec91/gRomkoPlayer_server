import sequelize from "../../db.js";
import { DataTypes } from "@sequelize/core";
import Users from "./User.model.js";

const Tracks = sequelize.define(
 "tracks",
 {
  track_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  original_file_name: { type: DataTypes.STRING, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false },
  user_id: {
   type: DataTypes.INTEGER,
   allowNull: false,
   //    references: { model: "users", foreignKey: "user_id" },
  },
 },

 { timestamps: false }
);

Users.hasMany(Tracks, { foreignKey: "user_id" });
// Tracks.belongsTo(Users);

export default Tracks;
