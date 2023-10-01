import express, { json } from 'express';
import cors from 'cors';
import { routes } from './routes';

const app = express();

app.use(cors());

app.use(json({ limit: '5mb' }));

app.use(routes);

export default app;
