import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT;

app.get('/', (request: Request, response: Response): void => {
    response.send('Hey now!');
});

app.listen(PORT, (): void => console.log(`App listening on port ${PORT}`));
