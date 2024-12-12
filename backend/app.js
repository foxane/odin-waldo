import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from './routes/router.js';

const app = express();
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || process.env.ALLOWED_ORIGINS.split(',').includes(origin)) {
        cb(null, true);
      } else {
        cb(new Error('Not allowed by cors'));
      }
    },
  }),
);
app.use(express.json());

app.use('/', router);

app.all('*', (req, res, next) => {
  res.status(404).json({ message: 'Resource not found' });
});
app.use((err, req, res, next) => {
  console.log('App level error: ', err);
  res.status(500).json({ message: 'internal server error' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server listening on port', port);
});
