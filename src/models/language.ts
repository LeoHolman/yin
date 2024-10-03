import sequelize from '@/utils/sequelize';
import { DataTypes } from 'sequelize';
import { LanguageModel } from '@/types';

export const Language = sequelize.define<LanguageModel>('Language', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
