import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import BooksRoute from './routes/BooksRoute.js'
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type']
    }
));

//what we need to do when we receive a GET request from client-------------------------
app.get('/', (request, response) => {
    // console.log(request);
    return response.status(619).send('Welcome to MERN stack tutorial')
})

app.use('/books', BooksRoute)


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("APP connected to database");
        app.listen(PORT, () => {
            console.log(`Server running at PORT: ${PORT}`)
        });
    })
    .catch((error) => {
        console.log(error)
    })

