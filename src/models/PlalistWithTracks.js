import sequelize from "../../db";

const PlaylistWithTracks = sequelize.define(
 "playlist_tracks",
 {
  playlist_id: {
   type: DataTypes.INTEGER,
   primaryKey: true,
   allowNull: false,
   references: { model: "playlists", key: "playlist_id" },
  },
  track_id: {
   type: DataTypes.INTEGER,
   primaryKey: true,
   references: { model: "tracks", key: "track_id" },
  },
 },
 { timestamps: false }
);

export default PlaylistWithTracks;
