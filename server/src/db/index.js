const {Pool} =require("pg");

const pool=new Pool({
    user: "postgres",
    host: "localhost",
    password: "khanzada123",
    database: "pern_auth",
    port: 5432,
});
module.exports=pool;