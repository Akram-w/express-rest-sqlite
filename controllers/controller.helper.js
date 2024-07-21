const express = require("express");
const router = express.Router();

const { saveAuthor, getAuthors } = require("./author.controller");

router.post("/authors", saveAuthor);
router.get("/authors", getAuthors);

module.exports = router;
