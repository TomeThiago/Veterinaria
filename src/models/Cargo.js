const { Model, DataTypes } = require('sequelize');

class Cargo extends Model {
    static init(connection) {
        super.init({
            nome: DataTypes.STRING,
            status: DataTypes.STRING,
            descricao: DataTypes.TEXT,
        }, {
            sequelize: connection,
            tableName: "cargo",
        })
    }
}

module.exports = Cargo;