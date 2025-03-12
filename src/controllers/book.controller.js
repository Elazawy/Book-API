import { book } from "../models/book.model.js";

export const getAllBooksController = async (req, res) => {
    try {
        const books = await book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving books', error: error.message });
    }
};

export const getBookByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const foundBook = await book.findById(id);
        if (!foundBook) {
            return res.status(404).json("Book not found");
        }
        res.status(200).json(foundBook);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving book', error: error.message });
    }
};

const addBook = async (bookData) => {
    const newBook = new book(bookData);
    return await newBook.save();
};

export const addBookcontroller = async (req, res) => {
    try {
        const { title, author, yearPublished } = req.body;
        const newBook = await addBook({ title, author, yearPublished });
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: 'Error creating book', error: error.message });
    }
};

const updateBook = async (id, updatedBook) => {
    return await book.findByIdAndUpdate(id, updatedBook, { new: true });
};

export const updateBookController = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, author, yearPublished } = req.body;
        const updatedBook = await updateBook(id, { title, author, yearPublished });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: 'Error updating book', error: error.message });
    }
};

const deleteBook = async (id) => {
    const result = await book.findByIdAndDelete(id);
    return result;
};

export const deleteBookController = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await deleteBook(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error: error.message });
    }
};