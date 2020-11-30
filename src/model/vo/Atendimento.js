const { Model, DataTypes } = require('sequelize');

class Atendimento extends Model {
  static init(connection) {
    super.init({
      anamnese: DataTypes.TEXT,
      ultimos_tratamentos: DataTypes.TEXT,
      tipotutor: DataTypes.TEXT,
      inicio: DataTypes.DATE,
      termino: DataTypes.DATE,
      inicio_previsto: DataTypes.DATE,
      tempo_previsto: DataTypes.INTEGER,
      diagnostico: DataTypes.TEXT,
      observacao: DataTypes.TEXT,
      peso_animal: DataTypes.FLOAT,
      status: DataTypes.STRING
    }, {
      sequelize: connection,
      tableName: "atendimento",
    })
  }

  static associate(models) {
    this.belongsTo(models.Paciente, { foreignKey: 'paciente_id', as: 'paciente' });
    this.belongsTo(models.Tutor, { foreignKey: 'tutor_id', as: 'tutor' });
    this.belongsTo(models.TipoAtendimento, { foreignKey: 'tipoatendimento_id', as: 'tipoatendimento' });
  }
}

module.exports = Atendimento;