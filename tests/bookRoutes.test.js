const request = require('supertest');
const express = require('express');
const bookRoutes = require('../src/routes/bookRoutes');
const Book = require('../src/models/Book');

const app = express();
app.use(express.json());
app.use('/api/books', bookRoutes);

jest.mock('../src/models/Book');

describe('Book Routes - successfully', () => {
    it('should return a list of books on GET /api/books', async () => {
        const mockBooks = [{ id: 1, titulo: 'Livro A', autor: 'Autor X', genero: 'Gênero V', ano_publicacao: 2018 }];
        Book.getAll.mockResolvedValue(mockBooks);
    
        const response = await request(app).get('/api/books');
    
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ books: mockBooks });
        expect(Book.getAll).toHaveBeenCalledTimes(1);
    });

    it('should return a book on GET /api/books/:id if found', async () => {
        const mockBook = { id: 1, titulo: 'Livro U', autor: 'Autor L', genero: 'Gênero C', ano_publicacao: 1988 };
        Book.getById.mockResolvedValue(mockBook);

        const response = await request(app).get('/api/books/1');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ book: mockBook });
        expect(Book.getById).toHaveBeenCalledWith(1);
    });

    it('should create a book on GET /api/books/genre/:genero if found', async () => {
        const mockBook = { id: 1, titulo: 'Hackeando Tudo', autor: 'Raiam Santos', genero: 'Desenvolvimento pessoal', ano_publicacao: 1988 };
        Book.getByGenre.mockResolvedValue(mockBook);

        const response = await request(app).get('/api/books/genre/Desenvolvimento Pessoal');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ book: mockBook });
        expect(Book.getByGenre).toHaveBeenCalledWith('Desenvolvimento pessoal');
    });

    it('should return a book on POST /api/books if found', async () => {
        const newBookData = { titulo: 'Livro F', autor: 'Autor T', genero: 'Gênero W', ano_publicacao: 2019 };
        const mockCreatedBook = ({ id: 2, ...newBookData });
        Book.create.mockResolvedValue(mockCreatedBook);

        const response = await request(app).post('/api/books').send(newBookData);

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({ book: mockCreatedBook });
        expect(Book.create).toHaveBeenCalledWith(newBookData);
    });

    it('should update a book on PUT /api/books/:id if found', async () => {
        const bookId = 1;
        const updatedBookData = { titulo: 'Novo Título', autor: 'Novo Autor', genero: 'Novo Gênero', ano_publicacao: 1999 };
        const mockUpdatedBook = { id: bookId, ...updatedBookData };
        Book.update.mockResolvedValue(mockUpdatedBook);

        const response = await request(app).put(`/api/books/${bookId}`).send(updatedBookData);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ book: mockUpdatedBook });
        expect(Book.update).toHaveBeenCalledWith(bookId, updatedBookData);
    });

    it('should return a 204 No Content on DELETE /api/books/:id if the book exists', async () => {
        Book.deleteById.mockResolvedValue(true);
    
        const bookIdToDelete = 1;
        const response = await request(app).delete(`/api/books/${bookIdToDelete}`);
    
        expect(response.statusCode).toBe(204);
        expect(response.body).toEqual({});
        expect(Book.deleteById).toHaveBeenCalledWith(bookIdToDelete)
    });
});

describe('Book Routes - failure', () => {
    it('should return 500 on GET /api/books if there is a server error', async () => {
        Book.getAll.mockRejectedValue(new Error('Erro inesperado no banco de dados'));
      
        const response = await request(app).get('/api/books');
      
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({ message: 'Erro interno do servidor' });
        expect(Book.getAll).toHaveBeenCalledTimes(1);
    });

    it('should return 404 on GET /api/books/:id if not found', async () => {
        Book.getById.mockResolvedValue(undefined);
    
        const response = await request(app).get('/api/books/99');
    
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ message: 'Livro não encontrado' });
        expect(Book.getById).toHaveBeenCalledWith(99);
    });

    it('should return an empty list on GET /api/books/genre/:genre if no books are found', async () => {
        const mockGenre = 'Ficção Científica';
        Book.getByGenre.mockResolvedValue([]);
      
        const response = await request(app).get(`/api/books/genre/${mockGenre}`);
      
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ books: [] });
        expect(Book.getByGenre).toHaveBeenCalledWith(mockGenre);
      });

    it('should return an error if required fields are missing on POST /api/books', async () => {
        const invalidBook = { titulo: 'Livro I', autor: 'Autor Z', genero: 'Gênero Q', ano_publicacao: 2005 };

        const response = await request(app).post('/api/books').send(invalidBook);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(Book.create).not.toHaveBeenCalled();
    });

    it('should return 404 on PUT /api/books/:id if book is not found', async () => {
        const nonExistentBookId = 99;
        Book.update.mockResolvedValue(null);
    
        const response = await request(app).put(`/api/books/${nonExistentBookId}`).send({ title: 'Novo Título' });
    
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ message: 'Livro não encontrado' });
        expect(Book.update).toHaveBeenCalledWith(nonExistentBookId, { title: 'Novo Título' });
    });
    
    it('should return 400 on PUT /api/books/:id if validation fails', async () => {
        const bookId = 1;
        const invalidBookData = { title: '' };
        Book.update.mockRejectedValue(new Error('Erro de validação'));
    
        const response = await request(app).put(`/api/books/${bookId}`).send(invalidBookData);
    
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ message: 'Erro de validação' });
        expect(Book.update).toHaveBeenCalledWith(bookId, invalidBookData);
    });

    it('should return a 404 Not Found on DELETE /api/books/:id if the book does not exist', async () => {
        Book.deleteById.mockResolvedValue(false);
    
        const nonExistentBookId = 99;
        const response = await request(app).delete(`/api/books/${nonExistentBookId}`);
    
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ message: 'Livro não encontrado' });
        expect(Book.deleteById).toHaveBeenCalledWith(nonExistentBookId);
    });
});