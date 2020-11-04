const { Model, DataTypes } = require('sequelize');

class MovimentoEstoque extends Model {
  static init(connection) {
    super.init({
      quantidade: DataTypes.DECIMAL,
      tipo: DataTypes.STRING,
      status: DataTypes.STRING,
    }, {
      sequelize: connection,
      tableName: "movimentoestoque",
    })
  }

  static associate(models) {
    this.belongsTo(models.Estoque, { foreignKey: 'estoque_id', as: 'estoque' });
  }
}

module.exports = MovimentoEstoque;