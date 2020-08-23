const { Model, DataTypes } = require('sequelize');

class Cargo extends Model {
	static init(connection) {
		super.init({
			nome: DataTypes.STRING,
			status: DataTypes.STRING,
			descricao: DataTypes.TEXT,
		}, {
			sequelize: connection,
			tableName: "cargo",
		})
	}

	static associate(models) {
    	this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
 	}
}

module.exports = Cargo;