import express from 'express'
import { addBook, deleteBook, getAllBooks, singleBook, updateBook } from '../controllers/bookController.js';
import { protect, user } from '../middlewares/auth.js';
const router = express.Router();

router.post('/', protect, user, addBook)
router.get('/', protect, user, getAllBooks)
router.get('/:id', protect, user, singleBook)
router.put('/:id', protect, user, updateBook) 
router.delete('/:id', protect, user, deleteBook)  

export default router 