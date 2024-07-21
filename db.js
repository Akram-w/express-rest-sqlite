const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const filePath = "./practice.db";

function createDbConnection() {
  try {
    if (fs.existsSync(filePath)) {
      console.log("DB exisists");
      return new sqlite3.Database(filePath);
    } else {
      const db = new sqlite3.Database(filePath, (error) => {
        if (error) {
          return console.error(error.message);
        }
        createDbTable(db);
      });
      console.log("Connection with sqLite has been established.");
      return db;
    }
  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Failed to remove file");
        }
      });
    }
  }
}

function createDbTable(db) {
  db.exec(
    `
        CREATE TABLE Author
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL
        );
        `
  );
}

module.exports = createDbConnection();
