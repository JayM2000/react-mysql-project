const { DataTypes } = require("sequelize");
const sequelize = require("../db");

// Define MySQL model similar to Mongoose schema
const Task = sequelize.define("Task", {
  task: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Export model
module.exports = Task;
