"use strict"; 
const User :any = (sequelize: any, DataTypes: any) =>
  sequelize.define(
    "user",
    {
      user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    },
    {
      tableName: "users",
      timestamps: false,
    },
  );

module.exports = User;
