"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize: any, DataTypes: any) => {
  class RespuestaErrada extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      RespuestaErrada.belongsTo(models.Pregunta);
    }
  }
  RespuestaErrada.init(
    {
      id: {
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true,
        autoIncrement:true
      },
      respuesta_errada: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "RespuestaErrada",
    }
  );
  return RespuestaErrada;
};
