// brings in the ORM to create functions that will interact with the database.
const orm = require('../config/orm.js');

const burger = {
    //will select all burgers from database
    selectAll: ((cb) => {
      orm.selectAll('burgers', (res) => {
        cb(res);
      });
    }),
    //users burger input will be inserted into the database with params of columns and values
    insertOne: ((cols, vals, cb) => {
      orm.insertOne('burgers', cols, vals, (res) => {
        cb(res);
      });
    }),

    updateOne: ((objColVals, condition, cb) => {
      orm.updateOne('burgers', objColVals, condition, (res) => {
        cb(res);
      });
    })
};
// Export the database functions for the controller (burgers_controller.js).
module.exports = burger;
