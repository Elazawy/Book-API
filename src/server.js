import express from 'express';
import "dotenv/config";
import morgan from 'morgan';
import { bookRouter } from './routes/book.routes.js';
dotenv.config();

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
app.use(bookRouter)