const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

//Listar todos os livros
router.get('/books', bookController.getAllBooks);

//Listar livro específico
router.get('books/:id', bookController.getBookById);

//Adicionar livro
router.post('/books', bookController.addBook);

//Atualizar livro
router.put('/books/:id', bookController.updateBook);

//Deletar livro
router.delete('/books/:id', bookController.deleteBook);

module.exports = router;


