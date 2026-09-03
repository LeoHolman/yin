const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/sequelize');

const QuizScore = sequelize.define(
    'QuizScore',
    {
        _id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        lesson_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        maxScore: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'quiz_scores',
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = QuizScore;