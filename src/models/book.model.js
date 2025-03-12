import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        yearPublished: {
            type: Number,
            required: true,
        },
    }
)
export const book = mongoose.model("book", bookSchema)