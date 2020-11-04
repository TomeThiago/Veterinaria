const { Model, DataTypes } = require('sequelize');

class AreaAtuacao extends Model {
    static init(connection) {
        super.init({
            nome: DataTypes.STRING,
            status: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: "areaatuacao",
        })
    }
}

module.exports = AreaAtuacao;