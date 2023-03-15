"use strict"; 
const employee = require('./employee');

const User :any = (sequelize: any, DataTypes: any) =>
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    },
    {
      tableName: "users",
      timestamps: false,
    },
    User.associate = function () {
      User.hasMany(employee, {as: 'employee'})
    }
  );

module.exports = User;
