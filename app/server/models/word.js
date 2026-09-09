const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/sequelize');

const Word = sequelize.define(
    'Word',
    {
        _id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        audioFile: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        pinyin: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        correctTone: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
        character: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        native_recording_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: 'words',
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = Word;