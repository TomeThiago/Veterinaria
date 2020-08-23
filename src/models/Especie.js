const { Model, DataTypes } = require('sequelize');

class Especie extends Model {
    static init(connection) {
        super.init({
            nome: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: "especie",
        })
    }

	static associate(models) {
    	this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
 	}
}

module.exports = Especie;