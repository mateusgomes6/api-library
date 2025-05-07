import express, { Router, Request, Response } from 'express';
const router = express.Router();
import * as bookController from '../controllers/bookController';

//Listar todos os livros
router.get('/books', bookController.getAllBooks);

//Listar livro específico
router.get('books/:id', bookController.getBookById);

//Buscar livros de um gênero específico
router.get('books/genre/:genero', bookController.getBookByGenre);

//Adicionar livro
router.post('/books', bookController.addBook);

//Atualizar livro
router.put('/books/:id', bookController.updateBook);

//Deletar livro
router.delete('/books/:id', bookController.deleteBook);

export default router;


