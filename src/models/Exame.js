const { Model, DataTypes } = require('sequelize');

class Exame extends Model {
    static init(connection) {
        super.init({
            nome: DataTypes.STRING,
            status: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: "exame",
        })
    }

    static associate(models) {
        this.belongsTo(models.TipoExame, { foreignKey: 'tipoexame_id', as: 'tipoexame' });
    }
}

module.exports = Exame;