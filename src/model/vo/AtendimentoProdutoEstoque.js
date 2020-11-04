const { Model, DataTypes } = require('sequelize');

class AtendimentoProdutoEstoque extends Model {
  static init(connection) {
    super.init({

    }, {
      sequelize: connection,
      tableName: "atendimentoprodutoestoque",
    })
  }

  static associate(models) {
    this.belongsTo(models.Estoque, { foreignKey: 'estoque_id', as: 'estoque' });
    this.belongsTo(models.AtendimentoProduto, { foreignKey: 'atendimentoproduto_id', as: 'atendimentoproduto' });
  }
}

module.exports = AtendimentoProdutoEstoque;