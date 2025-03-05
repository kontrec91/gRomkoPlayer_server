import { DataTypes } from "@sequelize/core";
import sequelize from "../../db";

const Playlists = sequelize.define(
 "playlists",
 {
  playlist_name: { type: DataTypes.STRING },
  playlist_id: {
   type: DataTypes.INTEGER,
   primaryKey: true,
   autoIncrement: true,
  },
  user_id: {
   type: DataTypes.INTEGER,
   primaryKey: true,
   allowNull: false,
   references: { model: "users", key: "user_id" },
  },
 },
 { timestamps: false }
);

export default Playlists;
