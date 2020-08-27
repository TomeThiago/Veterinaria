const { Model, DataTypes } = require('sequelize');

class Auditoria extends Model {
	static init(connection) {
		super.init({
			operacao: DataTypes.STRING,
			chave: DataTypes.INTEGER,
			tabela: DataTypes.STRING,
			data_operacao: DataTypes.DATE,
			sincronizado: DataTypes.TEXT,
		}, {
			sequelize: connection,
			tableName: "auditoria",
		})
	}
	
	static associate(models) {
		this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
	  }
}

module.exports = Auditoria;