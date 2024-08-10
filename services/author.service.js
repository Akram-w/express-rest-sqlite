const db = require("../db");

exports.saveUser = (name, email) => {
  return new Promise((resolve, reject) => {
    db.run(
      `
            INSERT INTO Author (name,email) VALUES ('${name}','${email}')
        `,
      function (err) {
        if (err) {
          console.error(`Failed to insert the record error: ${err}`);
          reject(err);
        } else {
          console.log(`Data inserted ${JSON.stringify(this.lastID)}`);
          resolve({
            id: this.lastID,
            name,
            email,
          });
        }
      }
    );
  });
};

exports.getAllAuthors = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `
           SELECT * FROM AUTHOR ORDER BY id
            `,
      (err, rows) => {
        if (err) {
          console.error(`Failed to fetch records error: ${err}`);
          reject(err);
        }
        console.log(`Found ${rows.length} Authors`);
        resolve(rows);
      }
    );
  });
};

exports.getAuthorById = (id) => {
  return new Promise((resolve, reject) => {
    db.all(` SELECT * FROM Author WHERE id = ${id}`, (err, rows) => {
      if (err) {
        console.log(
          `Error while getting Author By id=${id}, ERROR:${err.message}`
        );
        reject(err);
      }
      resolve(rows);
    });
  });
};

exports.updateAuthor = ({ id, name, email }) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE Author SET name = '${name}', email = '${email}' WHERE id=${id}`,
      function (error) {
        if (error) {
          console.log(`Error while updating author ERROR:${error.message}`);
          reject(error);
        } else {
          console.log(`Data updated ${JSON.stringify(this.lastID)}`);
          resolve(this.lastID);
        }
      }
    );
  });
};

exports.deleteAuthor = (id) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM Author WHERE id = ${id}`, function (error) {
      if (error) {
        console.log(`Error while deleting author ERROR:${error.message}`);
        reject(error);
      } else {
        resolve(id);
      }
    });
  });
};
