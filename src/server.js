import express from 'express';
import 'dotenv/config'; // This automatically loads .env variables
import morgan from 'morgan';
import { bookRouter } from './routes/book.routes.js';
import mongoose from 'mongoose';

export const app = express();
app.use(express.json());
app.use(morgan('dev'));

const connectToDb = async () => {
    try {
        const Uri = process.env.MONGO_URI;
        await mongoose.connect(Uri);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
};

connectToDb();
app.use(bookRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});