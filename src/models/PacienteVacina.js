const {Model, DataTypes} = require('sequelize');

class PacienteVacina extends Model {
  static init(connection) {
    super.init({
      data: DataTypes.DATE
    }, {
      sequelize: connection,
      tableName: 'paciente'
    })
  }

  static associate(models) {
    this.belongsTo(models.Paciente, { foreignKey: 'paciente_id', as: 'paciente' });
    this.belongsTo(models.Produto, { foreignKey: 'vacina_id', as: 'produto' });
  }
}

module.exports = PacienteVacina;