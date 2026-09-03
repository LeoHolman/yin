const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/sequelize');

const NativeRecording = sequelize.define(
    'NativeRecording',
    {
        _id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        data: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: 'nativerecordings',
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = NativeRecording;