const { Model, DataTypes } = require('sequelize');

class Especie extends Model {
    static init(connection) {
        super.init({
            nome: DataTypes.STRING,
            status: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: "especie",
        })
    }
}

module.exports = Especie;