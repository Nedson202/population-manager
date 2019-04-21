import express from 'express';
import contactRoutes from './locations';
import { defaultLocationRoute } from '../utils';
import { errorHandler } from '../middlewares';

const app = express();

app.use(defaultLocationRoute, contactRoutes);
app.use(errorHandler);

export default app;
