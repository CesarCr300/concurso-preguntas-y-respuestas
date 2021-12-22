"use strict";
import { Model } from "sequelize";
module.exports = (sequelize: any, DataTypes: any) => {
  class Categoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      Categoria.hasMany(models.Pregunta);
      Categoria.hasMany(models.Ronda);
    }
  }
  Categoria.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nivel_dificultad: {
        allowNull: false,
        type: DataTypes.ENUM(1, 2, 3, 4, 5),
      },
      premio: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Categoria",
    }
  );
  return Categoria;
};
