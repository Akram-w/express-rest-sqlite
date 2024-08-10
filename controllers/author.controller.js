const db = require("../db");
const {
  saveUser,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} = require("../services/author.service");
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
    resp.status(500).json({ data: null, message: error.message });
  }
};
exports.getAuthorById = async (req, resp) => {
  try {
    const { id } = req.params;
    const author = await getAuthorById(id);
    if (author.length) {
      resp.status(200).json({ data: author[0], message: "success" });
    } else {
      resp.status(404).json({
        data: null,
        message: `Unable to find the author for id=${id}`,
      });
    }
  } catch (error) {
    console.log("Error while finding Author by id.");
    resp.status(500).json({ data: null, message: error.message });
  }
};

exports.updateAuthor = async (req, resp) => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;
    const author = await getAuthorById(id);
    if (author.length) {
      await updateAuthor({
        ...author[0],
        ...dataToUpdate,
        id,
      });
      const updatedAuthor = {
        ...author[0],
        ...dataToUpdate,
        id,
      };
      resp.status(200).json({ data: updatedAuthor, message: "success" });
    } else {
      resp.status(404).json({
        data: null,
        message: `Unable to find the author for id = ${id}`,
      });
    }
  } catch (error) {
    resp.status(500).json({ data: null, message: error.message });
  }
};

exports.deleteAuthor = async (req, resp) => {
  try {
    const { id } = req.params;
    const author = await getAuthorById(id);
    if (author.length) {
      await deleteAuthor(id);
      resp
        .status(200)
        .json({ data: null, message: "Author deleted successfully." });
    } else {
      resp.status(404).json({
        data: null,
        message: `Unable to find the author for id = ${id}`,
      });
    }
  } catch (error) {
    resp.status(500).json({ data: null, message: error.message });
  }
};
