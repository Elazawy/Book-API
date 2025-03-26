import { Router } from "express";
import {
    addBookcontroller,
    deleteBookController,
    getAllBooksController,
    getBookByIdController,
    updateBookController
} from "../controllers/book.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/books", verifyToken, getAllBooksController);
router.get("/books/:id", verifyToken, getBookByIdController);
router.post("/books", verifyToken, addBookcontroller);
router.put("/books/:id", verifyToken, updateBookController);
router.delete("/books/:id", verifyToken, deleteBookController);

export { router as bookRouter };