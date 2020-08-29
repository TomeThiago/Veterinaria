const { Model, DataTypes } = require('sequelize');

class Raca extends Model {
  static init(connection) {
    super.init({
      nome: DataTypes.STRING,
    }, {
      sequelize: connection,
      tableName: "raca",
    })
  }

  static associate(models) {
    this.belongsTo(models.Especie, { foreignKey: 'especie_id', as: 'especie' });
  }
}

module.exports = Raca;