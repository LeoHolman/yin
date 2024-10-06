import { Model } from 'sequelize';

export interface LessonModel extends Model {
  id: number;
  name: string;
  description: string;
  LanguageId: number;
  isQuiz: boolean;
}

export interface LanguageModel extends Model {
  id: number;
  name: string;
}

export interface WordModel extends Model {
  id: number;
  name: string;
  description: string;
  audioPath: string;
  toneMarking: string;
  RecordingId: number;
  LanguageId: number;
}

export interface RecordingModel extends Model {
  id: number;
  WordId: number;
  UserId: number;
  data: string;
  isNative: boolean;
}

export interface QuizScoreModel extends Model {
  LessonId: number;
  UserId: number;
  score: number;
  maxScore: number;
}

export interface UserModel extends Model {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  isTeacher: boolean;
  baseline: number;
  ActiveLanguageId: number;
  salt: string;
  password: string;
}
