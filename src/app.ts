import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import bookRoutes from './routes/bookRoutes';

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', bookRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});