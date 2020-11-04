const { Model, DataTypes } = require('sequelize');

class PacienteAnexo extends Model {
	static init(connection) {
		super.init({
      anexo: DataTypes.STRING,
		}, {
			sequelize: connection,
			tableName: "pacieteexameanexo",
		})
  }
  
  static associate(models) {
    this.belongsTo(models.PacienteExame, { foreignKey: 'pacienteexame_id', as: 'pacienteexame' });
  }
}

module.exports = PacienteAnexo;