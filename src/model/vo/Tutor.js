const { Model, DataTypes } = require('sequelize');

class Tutor extends Model {
	static init(connection) {
		super.init({
			nome: DataTypes.STRING,
			status: DataTypes.STRING,
			tipo_pessoa: DataTypes.STRING,
			cpf_cnpj: DataTypes.STRING,
			rg_ie: DataTypes.STRING,
			nacionalidade: DataTypes.STRING,
			sexo: DataTypes.STRING,
			data_nascimento: DataTypes.DATE,
			cep: DataTypes.STRING,
			endereco: DataTypes.STRING,
			numero: DataTypes.STRING,
			complemento: DataTypes.STRING,
			ponto_refencia: DataTypes.STRING,
			bairro: DataTypes.STRING,
			cidade: DataTypes.STRING,
			estado: DataTypes.STRING,
			observacao: DataTypes.STRING,
			status: DataTypes.STRING,
		}, {
			sequelize: connection,
			tableName: "tutor",
		})
	}

	static associate(models) {
    this.hasMany(models.ContatoTutor, { foreignKey: 'tutor_id', as: 'contatos' });
  }
}

module.exports = Tutor;