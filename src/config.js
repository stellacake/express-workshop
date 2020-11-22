const dotenv = require("dotenv");
const mysql = require("mysql");

dotenv.config();

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
});

module.exports = connection;
