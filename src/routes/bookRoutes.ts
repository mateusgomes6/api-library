const express = require('express');
const router = express.Router();
import * as bookController from '../controllers/bookController';
import { authenticate } from '../middleware/authMiddleware';

//Rotas públicas

//Listar todos os livros
router.get('/books', bookController.getAllBooks);

//Listar livro específico
router.get('books/:id', bookController.getBookById);

//Buscar livros de um gênero específico
router.get('books/genre/:genero', bookController.getBookByGenre);

//Buscar listagem paginada
router.get('books/paginated', bookController.getBooksPaginated);

//Rotas protegidas

//Adicionar livro
router.post('/books', authenticate, bookController.addBook);

//Atualizar livro
router.put('/books/:id', authenticate, bookController.updateBook);

//Deletar livro
router.delete('/books/:id', authenticate, bookController.deleteBook);

export default router;


