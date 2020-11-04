const {Model, DataTypes} = require('sequelize');

class Produto extends Model {
  static init(connection) {
    super.init({
      descricao: DataTypes.STRING,
      preco_custo: DataTypes.NUMBER,
      status: DataTypes.STRING,
      vacina: DataTypes.STRING,
    }, {
      sequelize: connection,
      tableName: 'produto'
    })
  }

  static associate(models) {
    this.belongsTo(models.Grupo, { foreignKey: 'grupo_id', as: 'grupo' });
  }
}

module.exports = Produto;