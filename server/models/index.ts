"use strict";

type dbType = {
  sequelize: any;
  Sequelize: any;
  Employee: any;
  Shift: any;
  ShiftType: any;
  User: any;
};

const Sequelize = require("sequelize");

const db: dbType = {
  sequelize: "",
  Sequelize: "",
  Employee: "",
  Shift: "",
  ShiftType: "",
  User: "",
};

const sequelize = new Sequelize(
  process.env.DB_DBNAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOSTNAME,
    dialect: "postgres",
  }
);

db.Employee = require("./employee")(sequelize, Sequelize.DataTypes);
db.Shift = require("./shift")(sequelize, Sequelize.DataTypes);
db.ShiftType = require("./shiftType")(sequelize, Sequelize.DataTypes);
db.User = require("./user")(sequelize, Sequelize.DataTypes);

db.Shift.belongsToMany(db.Employee, {
  through: "employees_shifts",
  onDelete: "cascade",
});

db.ShiftType.hasMany(db.Shift, {
  foreignKey: {
    name: "shift_type_id", // name used in the API (postman)
    field: "shift_type_id", // name used in the DB
  },
  onDelete: "cascade",
});

db.User.hasMany(db.Employee, {
  foreignKey: {
    name: "user_id",
    field: "user_id",
  },
  onDelete: "cascade",
});

db.User.hasMany(db.ShiftType, {
  foreignKey: {
    name: "user_id",
    field: "user_id",
  },
  onDelete: "cascade",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
