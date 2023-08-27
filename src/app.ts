import express from 'express';
import routes from './routes';
import { handler as errorHandler, logger as errorLogger } from './errors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);
app.use(errorLogger);
app.use(errorHandler);

export default app;
