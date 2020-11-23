const express = require("express");
const router = express.Router();
const connection = require("../config");

router.get("/", (req, res) => {
	connection.query("SELECT * FROM character_list", (err, results) => {
		if (err) {
			res.status(500).send("error retrieving your data");
		} else {
			res.json(results);
		}
	});
});

router.get("/:field", (req, res) => {
	let sql = "";
	const sqlFields = ["id", "firstname", "lastname", "woman", "birthday"];
	if (sqlFields.includes(req.params.field)) {
		sql = `SELECT ${req.params.field} FROM character_list ORDER BY ${req.params.field}`;
	}
	connection.query(sql, (err, results) => {
		if (err) {
			res.status(500).send("Error retrieving data");
		} else if (results.length == 0 || results == undefined) {
			res.status(404).send("data not found");
		} else {
			res.status(200).json(results);
		}
	});
});

router.get("/firstname/e", (req, res) => {
	connection.query(
		"SELECT * FROM character_list WHERE firstname LIKE '%e%'",
		(err, results) => {
			if (err) {
				res.status(500).send(`Error retrieving data`);
			} else if (results.length == 0 || results == undefined) {
				res.status(404).send(`Data not found`);
			} else {
				res.status(200).json(results);
			}
		}
	);
});

router.get("/lastname/g", (req, res) => {
	connection.query(
		"SELECT * FROM character_list WHERE lastname LIKE 'G%' ",
		(err, results) => {
			if (err) {
				res.status(500).send(`Error retrieving ${req.query.lastname} data`);
			} else if (results.length == 0 || results == undefined) {
				res.status(404).send(`${res.query.lastname} not found`);
			} else {
				res.status(200).json(results);
			}
		}
	);
});

router.get("/character/birthday", (req, res) => {
	connection.query(
		"SELECT * FROM character_list WHERE birthday >= '1969-01-01' ",
		(err, results) => {
			if (err) {
				res.status(500).send(`Error retrieving ${req.query.birthday} data`);
			} else if (results.length == 0 || results == undefined) {
				res.status(404).send(`${res.query.birthday} not found`);
			} else {
				res.status(200).json(results);
			}
		}
	);
});

router.get("/list/birthdays", (req, res) => {
	connection.query(
		"SELECT * FROM character_list ORDER BY birthday",
		(err, results) => {
			if (err) {
				res.status(500).send(`Error retrieving data`);
			} else if (results.length == 0 || results == undefined) {
				res.status(404).send(`$not found`);
			} else {
				res.status(200).json(results);
			}
		}
	);
});

router.post("/", (req, res) => {
	const { firstname, lastname, woman, birthday } = req.body;
	connection.query(
		"INSERT INTO character_list(firstname, lastname, woman, birthday) VALUES(?, ?, ?, ?)",
		[req.body],
		(err, results) => {
			if (err) {
				console.log(err);
				res.status(500).send("Error saving a character");
			} else {
				res.status(200).send("Successfully saved");
			}
		}
	);
});

router.put("/character/:id", (req, res) => {
	connection.query(
		"UPDATE character_list SET ? WHERE id=?",
		[req.body, req.params.id],
		(err, results) => {
			if (err) {
				res.status(500).send("Error updating a character");
			} else {
				res.status(200).send("character updated successfully ✨");
			}
		}
	);
});

router.put("/woman/:id", (req, res) => {
	connection.query(
		"UPDATE character_list SET woman=!woman WHERE id=?",
		[req.params.id],
		(err, results) => {
			if (err) {
				res.status(500).send("Error updating a character");
			} else {
				res.status(200).send("character updated successfully ✨");
			}
		}
	);
});

router.delete("/character/:id", (req, res) => {
	connection.query(
		"DELETE * FROM character_list WHERE id=?",
		[req.params.id],
		(err, results) => {
			if (err) {
				res.status(500).send("Error deleting a character");
			} else {
				res.status(200).send("character deleted successfully ✨");
			}
		}
	);
});

router.delete("/woman/", (req, res) => {
	connection.query(
		"DELETE * FROM character_list WHERE woman=0",
		[req.params.id],
		(err, results) => {
			if (err) {
				res.status(500).send("Error deleting characters");
			} else {
				res.status(200).send("characters deleted successfully ✨");
			}
		}
	);
});
module.exports = router;
