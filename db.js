import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
 user: "postgres",
 password: "123",
 host: "localhost",
 port: "5432",
 database: "music_player",
});

export default pool;
