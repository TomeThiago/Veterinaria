const { Model, DataTypes } = require('sequelize');

class Fornecedor extends Model {
	static init(connection) {
		super.init({
			nome: DataTypes.STRING,
			status: DataTypes.STRING,
			tipo_pessoa: DataTypes.STRING,
			cpf_cnpj: DataTypes.STRING,
			rg_ie: DataTypes.STRING,
			cep: DataTypes.STRING,
			endereco: DataTypes.STRING,
			numero: DataTypes.STRING,
			complemento: DataTypes.STRING,
			ponto_referencia: DataTypes.STRING,
			bairro: DataTypes.STRING,
			cidade: DataTypes.STRING,
			estado: DataTypes.STRING,
			observacao: DataTypes.TEXT,
			contribuinte: DataTypes.STRING,
		}, {
			sequelize: connection,
			tableName: "fornecedor",
		})
	}
}

module.exports = Fornecedor;