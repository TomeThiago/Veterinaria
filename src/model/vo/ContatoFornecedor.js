const {Model, DataTypes} = require('sequelize');

class ContatoFornecedor extends Model {
  static init(connection) {
    super.init({
      tipo: DataTypes.STRING,
      contato: DataTypes.STRING,
      observacao: DataTypes.TEXT,
    }, {
      sequelize: connection,
      tableName: "contatofornecedor",
    })
  }

  static associate(models) {
    this.belongsTo(models.Fornecedor, { foreignKey: 'fornecedor_id', as: 'fornecedor' });
  }
}

module.exports = ContatoFornecedor;