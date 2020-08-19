const {Model, DataTypes} = require('sequelize');

class ContatoTutor extends Model {
  static init(connection) {
    super.init({
      tipo: DataTypes.STRING,
      contato: DataTypes.STRING,
      observacao: DataTypes.TEXT,
    }, {
      sequelize: connection,
      tableName: "contatotutor",
    })
  }

  static associate(models) {
    this.belongsTo(models.Tutor, { foreignKey: 'tutor_id', as: 'tutor' });
  }
}

module.exports = ContatoTutor;