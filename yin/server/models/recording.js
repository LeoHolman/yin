const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/sequelize');

const Recording = sequelize.define(
    'Recording',
    {
        _id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        word_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        data: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: 'recordings',
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = Recording;