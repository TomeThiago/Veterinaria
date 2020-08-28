const { Model, DataTypes } = require('sequelize');

class Fazenda extends Model {
	static init(connection) {
		super.init({
            nome: DataTypes.STRING,
            telefone: DataTypes.STRING,
            email: DataTypes.STRING,
            cep: DataTypes.STRING,
            endereco: DataTypes.STRING,
            numero: DataTypes.STRING,
            complemento: DataTypes.STRING,
            ponto_referencia: DataTypes.STRING,
            bairro: DataTypes.STRING,
            cidade: DataTypes.STRING,
            estado: DataTypes.STRING,
            status: DataTypes.STRING,
		}, {
			sequelize: connection,
			tableName: "fazenda",
		})
	}
}

module.exports = Fazenda;