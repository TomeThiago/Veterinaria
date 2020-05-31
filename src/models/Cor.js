const { Model, DataTypes } = require('sequelize');

class Cor extends Model {
    static init(connection) {
        super.init({
            nome: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: "cor",
        })
    }
}

module.exports = Cor;