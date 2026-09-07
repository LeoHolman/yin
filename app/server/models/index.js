const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/sequelize');

const User = require('./user');
const Lesson = require('./lesson');
const Word = require('./word');
const Recording = require('./recording');
const QuizScore = require('./quiz_score');
const NativeRecording = require('./native_recording');

const LessonWord = sequelize.define(
  'lesson_words',
  {
    lesson: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    word: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: 'lesson_words',
    freezeTableName: true,
    timestamps: false,
  }
);

const QuizScoreRecording = sequelize.define(
  'quizscore_recordings',
  {
    quizScore: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    recording: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: 'quizscore_recordings',
    freezeTableName: true,
    timestamps: false,
  }
);

Lesson.belongsToMany(Word, {
  through: LessonWord,
  foreignKey: 'lesson',
  otherKey: 'word',
  as: 'words',
});

Word.belongsToMany(Lesson, {
  through: LessonWord,
  foreignKey: 'word',
  otherKey: 'lesson',
  as: 'lessons',
});

Word.belongsTo(NativeRecording, {
  foreignKey: 'native_recording_id',
  as: 'native_recording',
});

Recording.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

Recording.belongsTo(Word, {
  foreignKey: 'word_id',
  as: 'word',
});

QuizScore.belongsTo(Lesson, {
  foreignKey: 'lesson_id',
  as: 'lesson',
});

QuizScore.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

QuizScore.belongsToMany(Recording, {
  through: QuizScoreRecording,
  foreignKey: 'quizScore',
  otherKey: 'recording',
  as: 'recordings',
});

Recording.belongsToMany(QuizScore, {
  through: QuizScoreRecording,
  foreignKey: 'recording',
  otherKey: 'quizScore',
  as: 'quizScores',
});

module.exports = {
  sequelize,
  User,
  Lesson,
  Word,
  Recording,
  QuizScore,
  NativeRecording,
  LessonWord,
  QuizScoreRecording,
};