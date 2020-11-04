const { Model, DataTypes } = require('sequelize');

class Cfop extends Model {
	static init(connection) {
		super.init({
 			descricao: DataTypes.STRING,
			status: DataTypes.STRING,
		}, {
			sequelize: connection,
			tableName: "cfop",
		})
	}
}

module.exports = Cfop;