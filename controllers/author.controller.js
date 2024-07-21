const db = require("../db");
const { saveUser, getAllAuthors } = require("../services/author.service");
exports.saveAuthor = async (req, resp) => {
  try {
    const { name, email } = req.body;
    const user = await saveUser(name, email);
    resp.status(201).json({ data: user, message: "Success" });
  } catch (error) {
    console.error(`Error while insert Author error: ${error}`);
    resp.status(500).json({ data: null, message: `${error.message}` });
  }
};
exports.getAuthors = async (req, resp) => {
  try {
    const authors = await getAllAuthors();
    resp.status(200).json({ data: authors, message: "success" });
  } catch (error) {
    console.error("Error while getting all Authors");
  }
};
