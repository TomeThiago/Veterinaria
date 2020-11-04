const { Model, DataTypes } = require('sequelize');

class AtendimentoProduto extends Model {
  static init(connection) {
    super.init({
      quantidade: DataTypes.NUMBER,
    }, {
      sequelize: connection,
      tableName: "atendimentoproduto",
    })
  }

  static associate(models) {
    this.belongsTo(models.Atendimento, { foreignKey: 'atendimento_id', as: 'atendimento' });
    this.belongsTo(models.Produto, { foreignKey: 'produto_id', as: 'produto' });
  }
}

module.exports = AtendimentoProduto;