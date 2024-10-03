import sequelize from '@/utils/sequelize';
import { DataTypes } from 'sequelize';
import { RecordingModel } from '@/types';
import { Word } from './word';

export const Recording = sequelize.define<RecordingModel>('Recording', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  data: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isNative: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Recording.belongsTo(Word);
// Recording.belongsTo(User);
