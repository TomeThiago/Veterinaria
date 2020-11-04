const { Model, DataTypes } = require('sequelize');

class Grupo extends Model {
    static init(connection) {
        super.init({
            nome: DataTypes.STRING,
            status: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: "grupo",
        })
    }
}

module.exports = Grupo;