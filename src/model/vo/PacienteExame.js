const { Model, DataTypes } = require('sequelize');

class PacienteExame extends Model {
	static init(connection) {
		super.init({
      realizado: DataTypes.DATE,
      realizado_interno: DataTypes.STRING,
      diagnostico: DataTypes.TEXT,
      observacao: DataTypes.TEXT,
      status: DataTypes.STRING,
		}, {
			sequelize: connection,
			tableName: "pacienteexame",
		})
  }
  
  static associate(models) {
    this.belongsTo(models.Paciente, { foreignKey: 'paciente_id', as: 'paciente' });
    this.belongsTo(models.TipoExame, { foreignKey: 'tipoexame_id', as: 'tipoexame' });
    this.belongsTo(models.Exame, { foreignKey: 'exame_id', as: 'exame' });
  }
}

module.exports = PacienteExame;

	