import { Router } from "express";
import { addBookcontroller,
    deleteBookController,
    getAllBooksController,
    updateBookController } from "../controllers/book.controller.js";

const router = Router();

router.get("/books", getAllBooksController);
router.get("/books/:id", getBookByIdController);
router.post("/books", addBookcontroller);
router.put("/books/:id", updateBookController);
router.delete("/books/:id", deleteBookController)

export { router as bookRouter }