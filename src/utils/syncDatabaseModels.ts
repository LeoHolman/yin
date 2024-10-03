'use server';

import sequelize from './sequelize';
import { Lesson } from '@/models/lesson';
import { Language } from '@/models/language';
import { Word } from '@/models/word';
import { Recording } from '@/models/recording';
import { QuizScore } from '@/models/quizScore';

export async function syncDatabaseModels(): Promise<boolean> {
  try {
    await sequelize.authenticate();
    console.log('Database connection established');

    // sync database models
    Language.sync({ alter: true });
    Lesson.sync({ alter: true });
    Word.sync({ alter: true });
    Recording.sync({ alter: true });
    QuizScore.sync({ alter: true });
    return true;
  } catch (error) {
    console.error('Unable to connect to database: ', error);
    return false;
  }
}
