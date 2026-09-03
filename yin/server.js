const path = require('path');
const http = require('http');
const next = require('next');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const cookieParser = require('cookie-parser');
const { sequelize, databaseUrl } = require('./server/db/sequelize');
const { seedDatabase } = require('./server/db/seed');

const dev = process.env.NODE_ENV !== 'production';
const port = Number(process.env.PORT || 3000);
const sessionSecret = process.env.SESSION_KEY || 'keyboardcatfire99999999';

const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const wordRouter = require('./server/routers/word');
const lessonRouter = require('./server/routers/lesson');
const userRouter = require('./server/routers/user');
const recordingRouter = require('./server/routers/recording');
const quizScoreRouter = require('./server/routers/quiz_score');
const nativeRecordingRouter = require('./server/routers/native_recording');
const pitchRouter = require('./server/routers/pitch');

async function bootstrap() {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  await seedDatabase();
  await nextApp.prepare();

  const app = express();

  app.use(fileUpload());
  app.use(bodyParser.json());
  app.use(cors({ origin: true, credentials: true, optionsSuccessStatus: 200 }));
  app.use('/assets', express.static(path.join(__dirname, 'src', 'assets')));
  app.use(express.static(path.join(__dirname, 'server', 'uploads')));
  app.use(cookieParser());
  app.use(
    session({
      secret: sessionSecret,
      store: new PgSession({ conString: databaseUrl, createTableIfMissing: true }),
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 30 * 60 * 1000 },
    })
  );

  app.use(userRouter);
  app.use(wordRouter);
  app.use(lessonRouter);
  app.use(recordingRouter);
  app.use(quizScoreRouter);
  app.use(nativeRecordingRouter);
  app.use(pitchRouter);

  app.get('/hello/', (req, res) => {
    res.send('success!');
  });

  app.get('/sessions/', (req, res) => {
    if (req.session.page_views) {
      req.session.page_views += 1;
      res.send(`Seen ${req.session.page_views}`);
      return;
    }

    req.session.page_views = 1;
    res.send('Welcome');
  });

  app.all(/.*/, (req, res) => handle(req, res));

  http.createServer(app).listen(port, () => {
    console.log(`Yin Next app running on http://localhost:${port}`);
  });
}

bootstrap().catch((error) => {
  console.error('Failed to start yin:', error);
  process.exit(1);
});
