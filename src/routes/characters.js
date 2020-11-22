const express = require("express");
const router = express.Router();
const connection = require("../config");

router.get("/", (res, req) => {
	connection.query("SELECT * FROM character_list", (err, results) => {
		if (err) {
			res.status(500).send("error retrieving your data");
		} else {
			res.json(results);
		}
	});
});

router.get("/", (res, req) => {
	let sql = "SELECT * FROM character_list";
	let sqlValues = [];
	if (req.params.first) {
		sql += " WHERE firstname=?";
		sqlValues.push(req.params.firstname);
	} else if (req.params.lastname) {
		sql += " WHERE lastname=?";
		sqlValues.push(req.params.lastname);
	} else if (req.params.woman) {
		sql += " WHERE woman=?";
		sqlValues.push(req.params.woman);
	} else if (req.params.birthday) {
		sql += " WHERE birthday=?";
		sqlValues.push(req.params.birthday);
	} else if (req.params.id) {
		sql += " WHERE id=?";
		sqlValues.push(req.params.id);
	}
	connection.query(sql, sqlValues, (err, results) => {
		if (err) {
			res.status(500).send("Error retrieving data");
		} else if (results.length == 0 || results == undefined) {
			res.status(404).send("Character not found");
		} else {
			res.status(200).json(results);
		}
	});
});

router.get("/firstname", (res, req) => {
	connection.query(
		"SELECT * FROM character_list WHERE firstname LIKE '%e%' ",
		[req.query.firstname],
		(err, results) => {
			if (err) {
				res.status(500).send(`Error retrieving ${req.params.firstname} data`);
			} else if (results.length == 0 || results == undefined) {
				res.status(404).send(`${res.query.firstname} not found`);
			} else {
				res.status(200).json(results);
			}
		}
	);
});

router.get("/", (res, req) => {
	connection.query(
		"SELECT * FROM character_list WHERE lastname LIKE 'G%' ",
		[req.query.lastname],
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

router.get("/", (res, req) => {
	connection.query(
		"SELECT * FROM character_list WHERE birthday >= '1969-01-01' ",
		[req.query.birthday],
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

router.get("/:birthday", (res, req) => {
	connection.query(
		"SELECT * FROM character_list ORDER BY birthday",
		[req.params.birthday],
		(err, results) => {
			if (err) {
				res.status(500).send(`Error retrieving ${req.params.birthday} data`);
			} else if (results.length == 0 || results == undefined) {
				res.status(404).send(`${res.params.birthday} not found`);
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

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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

router.delete("/:woman", (req, res) => {
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
