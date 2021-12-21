'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize:any, DataTypes:any) => {
  class Pregunta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      Pregunta.hasMany(models.RespuestaErrada);
    }
  };
  Pregunta.init({
    id: {
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement:true
    },
    pregunta: DataTypes.STRING,
    respuesta_correcta: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Pregunta',
  });
  return Pregunta;
};