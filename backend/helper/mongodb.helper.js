const Role = require("../../backend/models/role.model");

const initDataMongo = () => {
  Role.estimatedDocumentCount((err, count) => {
    console.log(`Role count is: ${count}`);
    if (!err && count === 0) {
      new Role({name: 'user'}).save(err => {
        if (err) {
          console.log("-> err", err);
        }
        console.log("added 'user' to roles collection");
      });

      new Role({name: 'moderator'}).save(err => {
        if (err) {
          console.log("-> err", err);
        }
        console.log("added 'moderator' to roles collection");
      });

      new Role({name: 'admin'}).save(err => {
        if (err) {
          console.log("-> err", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  })
}
module.exports = {initDataMongo}
