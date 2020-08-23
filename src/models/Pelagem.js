const { Model, DataTypes } = require('sequelize');

class Pelagem extends Model {
    static init(connection) {
        super.init({
            nome: DataTypes.STRING,
            statys: DataTypes.STRING
        }, {
            sequelize: connection,
            tableName: "pelagem",
        })
    }

	static associate(models) {
    	this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
 	}
}

module.exports = Pelagem;