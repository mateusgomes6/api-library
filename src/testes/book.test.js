const Book = require ('../models/Book');
const db = require ('../database/db');

beforeEach(() => {
    jest.clearAllMocks();
})

db.execute = jest.fn();

describe('Book Model', () => {
    it('shoud call db.execute with the correct query and parameters when getAll is called', async () => {
        const mockBooks = [{ id: 1, titulo: 'Livro A', autor: 'Autor X' }];
        db.execute.mockResolvedValue([mockBooks]);

        const books = await Book.getAll();

        expect(db.execute).toHaveBeenCalledWith('SELECT * FROM books');
        expect(books).toEqual(mockBooks);
    });

    it('shoud call db.execute with the correct query and parameters when getById is called', async () => {
        const mockBook = { id: 1, titulo: 'Livro A', autor: 'Autor X' };
        db.execute.mockResolvedValue([[mockBook]]);

        const book = await Book.getById(1);

        expect(db.execute).toHaveBeenCalledWith('SELECT * FROM books WHERE ID = ?', [1]);
        expect(book).toEqual(mockBook);
    });

    it('shoud call db.execute with the correct query and parameters when getByGenre is called', async () => {
        const livros = [
            { id: 1, titulo: 'Dom Casmurro', genero: 'Romance' },
            { id: 2, titulo: 'Memórias Póstumas de Brás Cubas', genero: 'Romance' }
        ];
        db.execute.mockResolvedValue([livros]);

        const livrosRomance = await Book.getByGenre('Romance');

        expect(db.execute).toHaveBeenCalledWith('SELECT * FROM books WHERE genero = ?', ['Romance']);
        expect.livrosRomance.toEqual(livros);
    });

    it('shoud call db.execute with the correct query and parameters when create is called', async () => {
        const bookData = { titulo: 'Livro B', autor: 'Autor Y', genero: 'Gênero M', ano_publicacao: 20/10/2009 };
        const mockInsertId = 2;
        db.execute.mockResolvedValue([{ insertId: mockInsertId }]);

        const bookId = await Book.create(bookData);

        expect(db.execute).toHaveBeenCalledWith('INSERT INTO books VALUES (?, ?, ?, ?', 
            [bookData.titulo, bookData.autor, bookData.genero, bookData.ano_publicacao]
        );
        expect(bookId).toBe(mockInsertId);
    });
});

