const { Model, DataTypes } = require('sequelize');

class TipoAtendimento extends Model {
	static init(connection) {
		super.init({
            tempo_estimado: DataTypes.INTEGER,
			nome: DataTypes.STRING,
			status: DataTypes.STRING,
		}, {
			sequelize: connection,
			tableName: "tipoatendimento"
		})
	}

	static associate(models) {
    	this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
 	}
}

module.exports = TipoAtendimento;