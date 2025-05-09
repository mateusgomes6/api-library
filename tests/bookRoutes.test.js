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

        const response = await request(app).get('/api/boks/:id');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ book: mockBook });
        expect(Book.getById).toHaveBeenCalledWith(1);
    });
});

describe('Book Routes - failure', () => {});