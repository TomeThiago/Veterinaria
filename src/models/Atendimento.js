const { Model, DataTypes } = require('sequelize');

class Atendimento extends Model {
	static init(connection) {
		super.init({
			status: DataTypes.STRING,
			anamnese: DataTypes.TEXT,
			ultimos_tratamentos: DataTypes.TEXT,
			tipotutor: DataTypes.TEXT,
			inicio: DataTypes.DATE,
			termino: DataTypes.DATE,
			inicio_previsto: DataTypes.DATE,
			tempo_previsto: DataTypes.INTEGER,
			diagnostico: DataTypes.TEXT,
			observacao: DataTypes.TEXT,
			peso_animal: DataTypes.FLOAT
		}, {
			sequelize: connection,
			tableName: "atendimento",
		})
	}

	static associate(models) {
    	this.belongsTo(models.Paciente, { foreignKey: 'paciente_id', as: 'paciente' });
    	this.belongsTo(models.Tutor, { foreignKey: 'tutor_id', as: 'tutor' });
    	this.belongsTo(models.TipoAtendimento, { foreignKey: 'tipoatendimento_id', as: 'tipoatendimento' });
    	this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
  }
}

module.exports = Atendimento;