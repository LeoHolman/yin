const express = require('express');
const randomBytes = require('randombytes');
const { NativeRecording, Word } = require('../models');

const router = new express.Router();

router.post('/api/nativeRecording/add/', async (req,res,next) => {
    const data = new String(req.files.recording.data);
    const incomingword = req.body.word;
    try{
        const word = await Word.findByPk(incomingword);
        try{
            let newNativeRecording = await NativeRecording.create({
                _id: randomBytes(12).toString('hex'),
                data,
            });
            word.native_recording_id = newNativeRecording._id;
            await word.save();
            res.send(data);

        } catch (ex) {
            console.log(ex);
            res.status(500).send(ex);
        }

    } catch (ex) {
        res.status(404).send('Word not found');
    }
})

module.exports = router;