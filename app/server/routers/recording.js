const express = require('express');
const randomBytes = require('randombytes');
const { Recording, User } = require('../models');

const router = new express.Router();

router.get('/api/recordings/:_id', async (req, res, next) => {
    const _id = req.params._id;
    const recording = await Recording.findByPk(_id);
    res.send(recording);
});

router.post('/api/recordings/add/', async (req, res, next) => {
    const user = await User.findByPk(req.session.user);
    const dataset = await req.body.dataset;
    try {
        const newRecording = await Recording.create({
            _id: randomBytes(12).toString('hex'),
            user_id: user._id,
            data: dataset,
        });
        console.log('Recording saved successfully');
        res.json({'recording':newRecording._id});
    } catch (ex) {
        console.log(ex);
        res.status(500).send('Something went wrong');
    }
});

module.exports = router;