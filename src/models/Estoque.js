const { Model, DataTypes } = require('sequelize');

class Estoque extends Model {
  static init(connection) {
    super.init({
      serie_nota: DataTypes.INTEGER,
      numero_nota: DataTypes.INTEGER,
      lote: DataTypes.STRING,
      quantidade: DataTypes.DECIMAL,
      validade: DataTypes.DATE,
      status: DataTypes.STRING,
    }, {
      sequelize: connection,
      tableName: "estoque",
    })
  }

  static associate(models) {
    this.belongsTo(models.Produto, { foreignKey: 'produto_id', as: 'produto' });
    this.belongsTo(models.Cfop, { foreignKey: 'cfop_id', as: 'cfop' });
    this.belongsTo(models.Fornecedor, { foreignKey: 'fornecedor_id', as: 'fornecedor' });
  }
}

module.exports = Estoque;