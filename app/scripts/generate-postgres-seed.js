const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const COLLECTIONS = [
  'users',
  'nativerecordings',
  'words',
  'lessons',
  'recordings',
  'quizscores',
];

const OUTPUT_PATH = path.join(__dirname, '..', 'database', 'postgres', 'seed.sql');

function exportCollection(collectionName) {
  const stdout = execFileSync(
    'docker',
    [
      'exec',
      'yin-mongo',
      'mongoexport',
      '--db',
      'yin',
      '--collection',
      collectionName,
      '--jsonArray',
    ],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }
  );

  const trimmed = stdout.trim();
  if (!trimmed) {
    return [];
  }

  return JSON.parse(trimmed);
}

function normalizeExtendedJson(value) {
  if (Array.isArray(value)) {
    return value.map(normalizeExtendedJson);
  }

  if (!value || typeof value !== 'object') {
    return value;
  }

  const keys = Object.keys(value);
  if (keys.length === 1) {
    if (Object.prototype.hasOwnProperty.call(value, '$oid')) {
      return value.$oid;
    }
    if (Object.prototype.hasOwnProperty.call(value, '$numberInt')) {
      return Number(value.$numberInt);
    }
    if (Object.prototype.hasOwnProperty.call(value, '$numberLong')) {
      return Number(value.$numberLong);
    }
    if (Object.prototype.hasOwnProperty.call(value, '$numberDouble')) {
      return Number(value.$numberDouble);
    }
    if (Object.prototype.hasOwnProperty.call(value, '$numberDecimal')) {
      return Number(value.$numberDecimal);
    }
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, nestedValue]) => [
      key,
      normalizeExtendedJson(nestedValue),
    ])
  );
}

function asArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (value === null || value === undefined || value === '') {
    return [];
  }

  return [value];
}

function extractId(value) {
  const normalized = normalizeExtendedJson(value);
  if (typeof normalized === 'string') {
    return normalized;
  }

  if (normalized && typeof normalized === 'object' && normalized._id) {
    return extractId(normalized._id);
  }

  return String(normalized);
}

function quoteIdentifier(identifier) {
  return `"${String(identifier).replace(/"/g, '""')}"`;
}

function quoteLiteral(value) {
  if (value === null || value === undefined) {
    return 'NULL';
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }

  if (typeof value === 'boolean') {
    return value ? 'TRUE' : 'FALSE';
  }

  const text = String(value);
  let tag = '$yin$';
  while (text.includes(tag)) {
    tag = `${tag.slice(0, -1)}x$`;
  }

  return `${tag}${text}${tag}`;
}

function toSqlValue(value) {
  if (value === null || value === undefined) {
    return 'NULL';
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }

  if (typeof value === 'boolean') {
    return value ? 'TRUE' : 'FALSE';
  }

  if (Array.isArray(value) || typeof value === 'object') {
    return `${quoteLiteral(JSON.stringify(value))}::jsonb`;
  }

  return quoteLiteral(value);
}

function buildInsert(tableName, columns, rows) {
  if (rows.length === 0) {
    return [];
  }

  const lines = [];
  const quotedColumns = columns.map(quoteIdentifier).join(', ');
  rows.forEach((row) => {
    const values = row.map(toSqlValue).join(', ');
    lines.push(
      `INSERT INTO ${quoteIdentifier(tableName)} (${quotedColumns}) VALUES (${values});`
    );
  });
  return lines;
}

function main() {
  const exported = Object.fromEntries(
    COLLECTIONS.map((collectionName) => [
      collectionName,
      exportCollection(collectionName).map(normalizeExtendedJson),
    ])
  );

  const statements = ['BEGIN;'];

  statements.push(
    ...buildInsert(
      'users',
      ['_id', 'username', 'password', 'salt', 'activeLang', 'is_teacher', 'baseline'],
      exported.users.map((user) => [
        extractId(user._id),
        user.username,
        user.password,
        user.salt,
        user.activeLang || 'mandarin',
        Boolean(user.is_teacher),
        user.baseline ?? null,
      ])
    )
  );

  statements.push(
    ...buildInsert(
      'nativerecordings',
      ['_id', 'data'],
      exported.nativerecordings.map((recording) => [
        extractId(recording._id),
        recording.data,
      ])
    )
  );

  statements.push(
    ...buildInsert(
      'words',
      ['_id', 'audioFile', 'pinyin', 'correctTone', 'character', 'native_recording_id'],
      exported.words.map((word) => [
        extractId(word._id),
        word.audioFile,
        word.pinyin,
        asArray(word.correctTone),
        word.character,
        word.native_recording ? extractId(word.native_recording) : null,
      ])
    )
  );

  statements.push(
    ...buildInsert(
      'lessons',
      ['_id', 'name', 'description', 'language', 'is_quiz', 'quizSections'],
      exported.lessons.map((lesson) => [
        extractId(lesson._id),
        lesson.name,
        lesson.description,
        lesson.language,
        Boolean(lesson.is_quiz),
        asArray(lesson.quizSections),
      ])
    )
  );

  const lessonWordRows = [];
  exported.lessons.forEach((lesson) => {
    asArray(lesson.words).forEach((wordId) => {
      lessonWordRows.push([extractId(lesson._id), extractId(wordId)]);
    });
  });
  statements.push(...buildInsert('lesson_words', ['lesson', 'word'], lessonWordRows));

  statements.push(
    ...buildInsert(
      'recordings',
      ['_id', 'word_id', 'user_id', 'data'],
      exported.recordings.map((recording) => [
        extractId(recording._id),
        recording.word ? extractId(recording.word) : null,
        recording.user ? extractId(recording.user) : null,
        Array.isArray(recording.data) || typeof recording.data === 'object'
          ? JSON.stringify(recording.data)
          : recording.data,
      ])
    )
  );

  statements.push(
    ...buildInsert(
      'quiz_scores',
      ['_id', 'lesson_id', 'user_id', 'score', 'maxScore'],
      exported.quizscores.map((quizScore) => [
        extractId(quizScore._id),
        quizScore.lesson ? extractId(quizScore.lesson) : null,
        quizScore.user ? extractId(quizScore.user) : null,
        quizScore.score,
        quizScore.maxScore,
      ])
    )
  );

  const quizScoreRecordingRows = [];
  exported.quizscores.forEach((quizScore) => {
    asArray(quizScore.recordings).forEach((recordingId) => {
      quizScoreRecordingRows.push([
        extractId(quizScore._id),
        extractId(recordingId),
      ]);
    });
  });
  statements.push(
    ...buildInsert(
      'quizscore_recordings',
      ['quizScore', 'recording'],
      quizScoreRecordingRows
    )
  );

  statements.push('COMMIT;');

  const output = `${statements.join('\n')}\n`;
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, output, 'utf8');
  console.log(`Wrote ${OUTPUT_PATH}`);
}

main();