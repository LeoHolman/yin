import sequelize from '@/utils/sequelize';
import { DataTypes } from 'sequelize';
import { LessonModel } from '@/types';
import { Language } from './language';

export const Lesson = sequelize.define<LessonModel>('Lesson', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  isQuiz: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Lesson.belongsTo(Language);
