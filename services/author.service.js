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
