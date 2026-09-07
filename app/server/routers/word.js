const express = require('express');
const { Word, NativeRecording } = require('../models');
const path = require('path');
const fs = require('fs');
const { extractPitchFromWavFile } = require('../services/pitch');
const randomBytes = require('randombytes');

const router = new express.Router();

router.post('/api/words/add/', async (req, res, next) => {
    const relativeBase = path.join('uploads', 'test');
    const audioDirPath = path.join(path.dirname(__dirname), relativeBase);
    const audioPath = path.join(audioDirPath, req.files.audioFile.name);
    const storePath = path.join('test', req.files.audioFile.name);
    const pinyin = req.body.pinyin;
    const correctTone = [Number(req.body.correctTone)];
    const character = req.body.character;
    try {
        if(!fs.existsSync(audioDirPath)){
            fs.mkdirSync(audioDirPath, { recursive: true });
        }
        const incomingFile = req.files.audioFile;
        await incomingFile.mv(audioPath);

        const formattedData = await extractPitchFromWavFile(audioPath);
        const newNativeRecording = await NativeRecording.create({
            _id: randomBytes(12).toString('hex'),
            data: formattedData,
        });

        await Word.create({
            _id: randomBytes(12).toString('hex'),
            audioFile: storePath,
            pinyin,
            correctTone,
            character,
            native_recording_id: newNativeRecording._id,
        });
        res.status(200).send('Upload complete.');
        return;
    } catch (ex) {
        console.log(ex);
        res.status(500).send('Internal server error');
    }
});

router.get('/api/words/all/', async (req, res, next) => {
    try {
        const allWords = await Word.findAll({
            include: [{ model: NativeRecording, as: 'native_recording' }],
        });
        res.send(allWords);
    } catch (ex) {
        res.status(500).send('Something went wrong');
    }
})

router.get('/api/words/:character/', async (req, res, next) => {
    const character = req.params.character;
    try {
        const words = await Word.findAll({
            where: { character },
            include: [{ model: NativeRecording, as: 'native_recording' }],
        });
        res.send(words);
    } catch (ex) {
        console.log(ex);
        res.status(500).send('Something went wrong');
    }
});

router.delete('/api/words/:character/delete', async (req, res, next) => {
    const character = req.params.character;
    try {
        await Word.destroy({ where: { character } });
        res.send(`${character} deleted successfully.`);
    } catch (ex) {
        res.status(500).send('Something went wrong.');
    }
});

module.exports = router;