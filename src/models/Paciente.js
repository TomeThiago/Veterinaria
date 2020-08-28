const { Model, DataTypes } = require('sequelize');

class Paciente extends Model {
	static init(connection) {
		super.init({
			foto: DataTypes.STRING,
			nome: DataTypes.STRING,
			data_nascimento: DataTypes.DATE,
			sexo: DataTypes.STRING,
			porte: DataTypes.STRING,
			castrado: DataTypes.STRING,
			microchipado: DataTypes.STRING,
			numero_chip: DataTypes.STRING,
			pedigree: DataTypes.STRING,
			numero_pedigree: DataTypes.STRING,
			peso: DataTypes.DECIMAL,
			pratica_atividade_esportiva: DataTypes.STRING,
			atividade_esportiva: DataTypes.STRING,
			status: DataTypes.STRING,
		}, {
			sequelize: connection,
			tableName: "paciente",
		})
    }
    
    static associate(models) {
        this.belongsTo(models.Tutor, { foreignKey: 'tutor_id', as: 'tutor' });
        this.belongsTo(models.Especie, { foreignKey: 'especie_id', as: 'especie' });
        this.belongsTo(models.Raca, { foreignKey: 'raca_id', as: 'raca' });
        this.belongsTo(models.Pelagem, { foreignKey: 'pelagem_id', as: 'pelagem' });
        this.belongsTo(models.Cor, { foreignKey: 'cor_id', as: 'cor' });
        this.belongsTo(models.Fazenda, { foreignKey: 'fazenda_id', as: 'fazenda' });
    }
}

module.exports = Paciente;