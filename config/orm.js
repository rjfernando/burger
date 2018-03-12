const connection = require("../config/connection.js");

var printQuestionMarks = (num) => {
    var arr = [];
    
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
    return arr.toString();
  }
  
var objToSql = (ob) => {
    var arr = [];

    for (var key in ob) {
      var value = ob[key];
      if (Object.hasOwnProperty.call(ob, key)) {
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }
  
    return arr.toString();
  }
  
  // Object for all our SQL statement functions.
  var orm = {
    selectAll: (tableInput, cb) => {
      var queryString = "SELECT * FROM " + tableInput + ";";
      connection.query(queryString, (err, result) => {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },
    insertOne: (table, cols, vals, cb) => {
      var queryString = "INSERT INTO " + table;
  
      queryString += " (";
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";
  
      console.log(queryString);
  
      connection.query(queryString, vals, (err, result) => {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    },

    updateOne: (table, objColVals, condition, cb) => {
      var queryString = "UPDATE " + table;
  
      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;
  
      console.log(queryString);
      connection.query(queryString,(err, result) => {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    },
  
      delete: (table, objColVals, condition, cb) => {
        var queryString = "DELETE " + table;
    
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
    
        console.log(queryString);
        connection.query(queryString, (err, result) => {
          if (err) {
            throw err;
          }
          cb(result);
        });
      }
  };

module.exports = orm;