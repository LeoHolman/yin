import { DataTypes } from 'sequelize';
import { models } from '@auth/sequelize-adapter';
import sequelize from '@/utils/sequelize';
import { UserModel } from '@/types';
import { Language } from './language';

export const User = sequelize.define<UserModel>('User', {
  ...models.User,
  username: DataTypes.STRING,
  isTeacher: DataTypes.BOOLEAN,
  baseline: DataTypes.DECIMAL,
  salt: DataTypes.STRING,
  password: DataTypes.STRING,
});

User.belongsTo(Language, {
  foreignKey: {
    name: 'ActiveLanguageId',
  },
});
