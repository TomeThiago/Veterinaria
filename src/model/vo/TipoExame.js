const { Model, DataTypes } = require('sequelize');

class TipoExame extends Model {
    static init(connection) {
        super.init({
            nome: DataTypes.STRING,
            status: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: "tipoexame",
        })
    }
}

module.exports = TipoExame;