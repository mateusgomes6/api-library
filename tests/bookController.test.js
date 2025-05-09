const bookController = require('../controllers/bookController');
const Book = require('../models/Book');
const httpMocks = require('node-mocks-http');

beforeEach(() => {
    jest.clearAllMocks();
})

jest.mock('../../src/models/Book');

describe('Book Controller', () => {
    it('getAllBooks should retr=urn a list of books with status 200', async () => {
        const mockBooks = [{ id: 1, titulo: 'Livro A', autor: 'Autor Z', genero: 'Gênero D', ano_publicacão: 2013}];
        Book.getAll.mockResolvedValue(mockBooks);

        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();

        await bookController.getAllBooks(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual({ books: mockBooks });
        expect(Book.getAll).toHaveBeenCalledTimes(1);
    });
});