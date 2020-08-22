const { Model, DataTypes } = require('sequelize');

class User extends Model {
	static init(connection) {
		super.init({
			nome: DataTypes.STRING,
			email: DataTypes.STRING,
			senha: DataTypes.STRING,
			status: DataTypes.STRING,
			administrador: DataTypes.STRING,
		}, {
			sequelize: connection,
			tableName: "usuario",
			/*defaultScope: {
				attributes: {
					exclude: ['senha']
				}
			}*/
		})
	}

	static associate(models) {
    this.belongsTo(models.Cargo, { foreignKey: 'cargo_id', as: 'cargo' });
  }
}

module.exports = User;