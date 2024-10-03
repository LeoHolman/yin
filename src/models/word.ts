import sequelize from '@/utils/sequelize';
import { DataTypes } from 'sequelize';
import { WordModel } from '@/types';
import { Language } from './language';
import { Recording } from './recording';

export const Word = sequelize.define<WordModel>('Word', {
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
  audioPath: {
    type: DataTypes.STRING,
  },
  toneMarking: { type: DataTypes.STRING },
});

Word.belongsTo(Language);
// Word.belongsTo(Recording);
