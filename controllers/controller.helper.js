const express = require("express");
const router = express.Router();

const {
  saveAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor
} = require("./author.controller");

router.post("/authors", saveAuthor);
router.get("/authors", getAuthors);
router.get("/authors/:id", getAuthorById);
router.put("/authors/:id", updateAuthor);
router.delete('/authors/:id',deleteAuthor)

module.exports = router;
