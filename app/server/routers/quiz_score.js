const express = require('express');
const {auth} = require('../middleware/auth');
const randomBytes = require('randombytes');
const { QuizScore, User, Lesson } = require('../models');

const router = new express.Router();

router.post('/api/quizScores/add/', async (req, res, next) => {
    try {
        const fulllesson = await Lesson.findOne({ where: { name: req.body.lesson } });
        if (!fulllesson) {
            res.status(404).send('Lesson not found');
            return;
        }

        const fulluser = await User.findOne({ where: { username: req.body.user } });
        if (!fulluser) {
            res.status(404).send('User not found');
            return;
        }

        const lesson = fulllesson._id;
        const user = fulluser._id;
        const score = req.body.score;
        const maxScore = req.body.maxScore;
        const recordings = req.body.recordings;

        const newQuizScore = await QuizScore.create({
            _id: randomBytes(12).toString('hex'),
            lesson_id: lesson,
            user_id: user,
            score,
            maxScore,
        });
        if (Array.isArray(recordings) && recordings.length > 0) {
            await newQuizScore.setRecordings(recordings);
        }
        res.send('Score saved successfully.');
    } catch (ex) {
        console.log(ex);
        res.status(500).send('Something went wrong.');
    }
});

router.get('/api/quizScores/me/:lessonname/', auth, async (req, res, next) => {
    const user = req.user;
    try{
        const lesson = await Lesson.findOne({ where: { name: req.params.lessonname } });
        try{
            const quizScores = await QuizScore.findAll({ where: { user_id: user._id, lesson_id: lesson._id } });
            res.json(quizScores);
        } catch(ex) {
            res.status(404).send("You haven't taken this quiz yet.");
        }
    } catch (ex) {
        res.status(404).send('Lesson not found');
    }
});

module.exports = router;