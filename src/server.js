import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { bookRouter } from './routes/book.routes.js';
import { authRouter } from './routes/auth.routes.js';
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
app.use('/api', bookRouter);
app.use('/api', authRouter); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please use a different port.`);
        process.exit(1);
    } else {
        throw err;
    }
});