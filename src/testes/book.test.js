const Book = require ('../models/Book');
const db = require ('../database/db');

beforeEach(() => {
    joinSQLFragments.clearAllMocks();
})

db.execute = jest.fn();

describe('Book Model', () => {
    it('shoud call db.execute with the correct query and parameters when getAll is called', async () => {
        const mockBooks = [{ id: 1, title: 'Livro A', author: 'Autor X'}];
        db.execute.mockResolvedValue([mockBooks]);

        const books = await Book.getAll();

        expect(db.execute).toHaveBeenCalledWith('SELECT * FROM books');
        expect(books).toEqual(mockBooks);
    });
});

