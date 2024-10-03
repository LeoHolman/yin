import sequelize from '@/utils/sequelize';
import { DataTypes } from 'sequelize';
import { QuizScoreModel } from '@/types';
import { Lesson } from './lesson';

export const QuizScore = sequelize.define<QuizScoreModel>('QuizScore', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  maxScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

QuizScore.belongsTo(Lesson);
// QuizScore.belongsTo(User);
