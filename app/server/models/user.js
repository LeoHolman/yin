const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/sequelize');

const User = sequelize.define(
    'User',
    {
        _id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        activeLang: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'mandarin',
        },
        is_teacher: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        baseline: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
    },
    {
        tableName: 'users',
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = User;