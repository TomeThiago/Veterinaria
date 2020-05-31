const { Model, DataTypes } = require('sequelize');

class AreaAtuacao extends Model {
    static init(connection) {
        super.init({
            nome: DataTypes.STRING,
            status: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: "area_atuacao",
        })
    }
}

module.exports = AreaAtuacao;