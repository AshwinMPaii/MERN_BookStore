import express from 'express';
import { PORT } from './config.js';
import mongoose from 'mongoose';
import BooksRoute from './routes/BooksRoute.js'
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
const mongoDBUrl = process.env.MONGODB_URL;

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
    .connect(mongoDBUrl)
    .then(() => {
        console.log("APP connected to database");
        app.listen(PORT, () => {
            console.log(`Server running at PORT: ${PORT}`)
        });
    })
    .catch((error) => {
        console.log(error)
    })

