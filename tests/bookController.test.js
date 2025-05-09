const bookController = require('../controllers/bookController');
const Book = require('../models/Book');
const httpMocks = require('node-mocks-http');

beforeEach(() => {
    jest.clearAllMocks();
})

jest.mock('../../src/models/Book');

describe('Book Controller - succesfully', () => {
    it('getAllBooks should return a list of books with status 200', async () => {
        const mockBooks = [{ id: 1, titulo: 'Livro A', autor: 'Autor Z', genero: 'Gênero D', ano_publicacão: 2013}];
        Book.getAll.mockResolvedValue(mockBooks);

        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();

        await bookController.getAllBooks(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual({ books: mockBooks });
        expect(Book.getAll).toHaveBeenCalledTimes(1);
    });

    it('getBookById should return a book with status 200 if found', async () => {
        const mockBook = { id: 1, titulo: 'Livro Y', autor: 'Autor S', genero: 'Gênero K', ano_publicacão: 2021};
        Book.getById.mockResolvedValue(mockBook);

        const req = httpMocks.createRequest({ params: { id: '1' } });
        const res = httpMocks.createResponse();

        await bookController.getBookById(req, res);
        
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual({ book: mockBook });
        expect(Book.getById).toHaveBeenCalledWith(1);
    });

    it('getBookByGenre should return a list of books of a specific genre with status 200', async () => {
        const mockBooks = [{ id: 2, titulo: 'Originals', autor: 'Adam Grant', genero: 'Investimento', ano_publicacão: 2017}];
        Book.getByGenre.mockResolvedValue(mockBooks);

        const req = httpMocks.createRequest({
            params: { genero: 'Investimento' }
        });
        const res = httpMocks.createResponse();

        await bookController.getByGenre(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData).toEqual({ books: mockBooks });
        expect(Book.getByGenre).toHaveBeenCalledWith('Investimento');
        expect(Book.getByGenre).toHaveBeenCalledTimes(1);
    });
});



describe('Book Controler - failure', () => {
    it('getBookById should return a book with status 404 if book is not found', async () => {
        Book.getById.mockResolvedValue(undefined);

        const req = httpMocks.createRequest({ params: { id: '99' } });
        const res = httpMocks.createResponse();

        await bookController.getBookById(req, res);

        expect(res.statusCode).toBe(404);
        expect(res._getJSONData()).toEqual({ message: 'Livro não encontrado' });
        expect(Book.getById).toHaveBeenCalledWith(99);
    });

    it('getByGenre should return an empty list with status 200 if no books of that genre are found', async () => {
        Book.getByGenre.mockResolvedValue([]);

        const req = httpMocks.createRequest({
            params: { genero: 'Gênero Z' },
        });
        const res = httpMocks.createResponse();

        await bookController.getByGenre(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData).toEqual({ books: [] });
        expect(Book.getByGenre).toHaveBeenCalledWith('Gênero E');
        expect(Book.getByGenre).toHaveBeenCalledTimes(1);
    });

    it('getByGenre should return status 500 if an error occurs', async () => {
        Book.getByGenre.mockRejectedValue(new Error('Erro ao buscar livros'));

        const req = httpMocks.createRequest({
            params: { genero: 'Gênero F' },
        });
        const res = httpMocks.createResponse();
    
        await bookController.getByGenre(req, res);
    
        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({ message: 'Erro ao buscar livros' });
        expect(Book.getByGenre).toHaveBeenCalledWith('Gênero F');
        expect(Book.getByGenre).toHaveBeenCalledTimes(1);
    });
});