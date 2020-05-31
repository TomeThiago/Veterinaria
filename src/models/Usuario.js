const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(connection) {
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            status: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: "usuario",
        })
    }
}

module.exports = User;