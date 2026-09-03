const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/sequelize');

const Lesson = sequelize.define(
    'Lesson',
    {
        _id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        language: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        is_quiz: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        quizSections: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: [],
        },
    },
    {
        tableName: 'lessons',
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = Lesson;