const express = require('express');
const argon2 = require('argon2');
const randomBytes = require('randombytes');
const {auth, getSafeUser} = require('../middleware/auth');
const { User } = require('../models');

const router = new express.Router();

router.post('/api/signup/', async (req, res) => {
    const username = req.body.username;
    const nameUnavailable = await User.findOne({ where: { username } });
    if(!nameUnavailable){
        const salt = randomBytes(32);
        const hashedPass = await argon2.hash(req.body.password, {salt});
        const newUser = await User.create({
            _id: randomBytes(12).toString('hex'),
            username: req.body.username,
            password: hashedPass,
            activeLang: 'mandarin',
            is_teacher: false,
            salt: salt.toString('hex'),
            baseline: req.body.baseline,
        });
        req.session.user = newUser._id;
        res.status(201).json({
            message: `Hello! ${req.body.username}`,
            username: req.body.username,
        });
    } else {
        res.status(409).send('Username taken, please try another.');
    }
});

router.get('/api/logout', async (req, res, next) =>{
    try{
        req.session.destroy(function(){
            console.log('logged out');
        });
        res.redirect('/login');
        // res.clearCookie('connection.sid');
        // req.session = null;
        // res.setHeader('set-cookie', 'connect.sid=; max-age=0');
        // res.clearCookie('connect.sid');
        res.status(200).send('logout successful?');
    } catch {
        res.status(401).send('Logout unsuccessful');
        console.log("caught that error in logout");
    }

})


router.post('/api/login/', async (req, res, next) => {
    const username = String(req.body.username || '').trim();
    const userRecord = await User.findOne({ where: { username } });

    if (!userRecord) {
        res.status(401).send('Username/password incorrect');
        return;
    }

    const incomingPassword = String(req.body.password || '');
    let correctPassword = false;

    try {
        if (typeof userRecord.password === 'string' && userRecord.password.startsWith('$')) {
            correctPassword = await argon2.verify(userRecord.password, incomingPassword);
        } else {
            correctPassword = userRecord.password === incomingPassword;
        }
    } catch (ex) {
        console.log(ex);
        correctPassword = userRecord.password === incomingPassword;
    }

    if (correctPassword) {
        req.session.user = userRecord._id;
        res.status(204).send();
        return;
    }

    res.status(401).send('Username/password incorrect.');
});

router.get('/api/user/me/', async (req, res, next) => {
    try {
        const userID = req.session && req.session.user;
        if (!userID) {
            res.sendStatus(204);
            return;
        }

        const user = await User.findByPk(userID);
        if (!user) {
            res.sendStatus(204);
            return;
        }

        req.user = user;
        getSafeUser(req, res, () => {});
        res.json(req.user);
    } catch (error) {
        console.log(error);
        res.sendStatus(204);
    }
});


router.post('/api/user/baseline/add/', auth, async (req, res, next) => {
    const user = req.user;
    user.baseline = req.body.baseline;
    await user.save();
    res.sendStatus(204);
});


router.post('/api/user/activeLang/add/', auth, async (req, res, next) => {
    const user = req.user;
    user.activeLang = req.body.activeLang;
    await user.save();
    res.sendStatus(204);
});
//this works now!! i think

module.exports = router;