"use strict";
import { Model } from "sequelize";
module.exports = (sequelize: any, DataTypes: any) => {
  class Jugador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  Jugador.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      premio: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      record_rondas: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Jugador",
    }
  );
  return Jugador;
};
