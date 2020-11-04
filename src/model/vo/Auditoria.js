  
const { Model, DataTypes } = require('sequelize');

class Auditoria extends Model {
	static init(connection) {
		super.init({
			operacao: DataTypes.STRING,
			chave: DataTypes.INTEGER,
			tabela: DataTypes.STRING,
			sincronizado: DataTypes.TEXT,
			usuario_id: DataTypes.INTEGER,
		}, {
			sequelize: connection,
			tableName: "auditoria",
		})
	}
}

module.exports = Auditoria;