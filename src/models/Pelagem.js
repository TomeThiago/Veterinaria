const { Model, DataTypes } = require('sequelize');

class Pelagem extends Model {
    static init(connection) {
        super.init({
            nome: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: "pelagem",
        })
    }
}

module.exports = Pelagem;