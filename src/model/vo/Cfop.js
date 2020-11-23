const { Model, DataTypes } = require('sequelize');

class Cfop extends Model {
	static init(connection) {
		super.init({
			cfop: DataTypes.STRING,
 			descricao: DataTypes.STRING,
			status: DataTypes.STRING,
		}, {
			sequelize: connection,
			tableName: "cfop",
		})
	}

	static associate(models) {
    this.hasMany(models.Estoque, { foreignKey: 'cfop_id', as: 'cfops' });
  }
}

module.exports = Cfop;