// import pkg from "pg";
// const { Pool } = pkg;

// const pool = new Pool({
//  user: "postgres",
//  password: "123",
//  host: "localhost",
//  port: "5432",
//  database: "music_player",
// });

// export default pool;

import { Sequelize } from "@sequelize/core";

const sequelize = new Sequelize({
 database: "music_player", //db table name
 user: "postgres", //user who get permission to db
 password: "123", // password for user named postgres
 host: "localhost",
 port: 5432,
 dialect: "postgres", //db name
 ssl: true, // turn on the SSL
 clientMinMessages: "notice", // `client_min_messages` session parameter. Detect the client message level from the server
 logging: false, // for customizing the log which sequelize will create for every SQL query it performs. Not necessary
 ssl: {
  require: true, // require for all actions with db
  rejectUnauthorized: false, //  let to ignore the verification of server certificate
 },
});

export default sequelize;
