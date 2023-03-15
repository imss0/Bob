"use strict";

const Shift = (sequelize: any, DataTypes: any) =>
  sequelize.define(
    "shift",
    {
      shift_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      day_number_array: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "shifts",
      timestamps: false,
    }
  );

module.exports = Shift;
