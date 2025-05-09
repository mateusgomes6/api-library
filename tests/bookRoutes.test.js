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

        const response = await request(app).get('/api/books/:id');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ book: mockBook });
        expect(Book.getById).toHaveBeenCalledWith(1);
    });

    it('should return a book on GET /api/books/genre/:genero if found', async () => {
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
});

describe('Book Routes - failure', () => {});