const express = require('express');
const { Lesson, Word, NativeRecording } = require('../models');

const router = new express.Router();

const lessonInclude = [
    {
        model: Word,
        as: 'words',
        through: { attributes: [] },
        include: [
            {
                model: NativeRecording,
                as: 'native_recording',
            },
        ],
    },
];

router.get('/api/lessons/all/', async (req, res, next) => {
    try {
        const allLessons = await Lesson.findAll({ include: lessonInclude });
        res.send(allLessons);
    } catch (ex) {
        res.status(500).send('Something went wrong');
    }
});

router.get('/api/lessons/:name/', async (req, res, next) => {
    const name = req.params.name;
    try {
        const lesson = await Lesson.findOne({
            where: { name },
            include: lessonInclude,
        });

        if (!lesson) {
            res.status(404).send('Lesson not found');
            return;
        }

        res.send(lesson);
    } catch (ex) {
        console.log(ex);
        res.status(500).send('Something went wrong');
    }
});

router.get('/api/lessons/:name/words/', async (req, res, next) => {
    const name = req.params.name;
    const lesson = await Lesson.findOne({
        where: { name },
        include: [{ model: Word, as: 'words', through: { attributes: [] } }],
    });
    const words = lesson ? lesson.words : [];
    res.send(words);
})

router.post('/api/lessons/add/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    const name = req.body.name;
    const words = req.body.words;
    const description = req.body.description;
    const language = req.body.language;
    const is_quiz = req.body.is_quiz;
    const quizSections = req.body.quizSections;
    Lesson.create({
        _id: require('randombytes')(12).toString('hex'),
        name,
        description,
        language,
        is_quiz,
        quizSections,
    }).then(async (newLesson) => {
        if (Array.isArray(words) && words.length > 0) {
            await newLesson.setWords(words);
        }
        res.send(`${newLesson.name} saved successfully!`);
    });
});

router.put('/api/lessons/:name/edit/', async (req, res, next) => {
    const name = req.params.name;
    const newName = req.body.name;
    const words = req.body.words;
    const description = req.body.description;
    const language = req.body.language;
    const is_quiz = req.body.is_quiz;
    const quizSections = req.body.quizSections;
    const lessonToUpdate = await Lesson.findOne({ where: { name } });
    lessonToUpdate.name = newName;
    lessonToUpdate.description = description;
    lessonToUpdate.language = language;
    lessonToUpdate.is_quiz = is_quiz;
    lessonToUpdate.quizSections = quizSections;
    await lessonToUpdate.save();
    await lessonToUpdate.setWords(words);
    res.send(`${lessonToUpdate.name} updated successfully.`);
});

router.delete('/api/lessons/:name/delete/', async (req, res, next) => {
    const name = req.params.name;
    await Lesson.destroy({ where: { name } });
    res.send(`${name} deleted successfully.`);
});

module.exports = router;