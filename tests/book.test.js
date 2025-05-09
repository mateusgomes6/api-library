const Book = require ('../src/models/Book');
const db = require ('../src/database/db');

beforeEach(() => {
    jest.clearAllMocks();
})

db.execute = jest.fn();

describe('Book Model - successfully', () => {
    it('shoud call db.execute with the correct query and parameters when getAll is called', async () => {
        const mockBooks = [{ id: 1, titulo: 'Livro A', autor: 'Autor X', genero: 'Gênero Z', ano_publicacao: 2018 }];
        db.execute.mockResolvedValue([mockBooks]);

        const books = await Book.getAll();

        expect(db.execute).toHaveBeenCalledWith('SELECT * FROM books');
        expect(books).toEqual(mockBooks);
    });

    it('shoud call db.execute with the correct query and parameters when getById is called', async () => {
        const mockBook = { id: 1, titulo: 'Livro A', autor: 'Autor X', genero: 'Gênero H', ano_publicacao: 2017 };
        db.execute.mockResolvedValue([[mockBook]]);

        const book = await Book.getById(1);

        expect(db.execute).toHaveBeenCalledWith('SELECT * FROM books WHERE ID = ?', [1]);
        expect(book).toEqual(mockBook);
    });

    it('shoud call db.execute with the correct query and parameters when getByGenre is called', async () => {
        const livros = [
            { id: 1, titulo: 'Dom Casmurro', autor: 'Machado de Assis', genero: 'Romance', ano_publicacao: 1899 },
            { id: 2, titulo: 'Memórias Póstumas de Brás Cubas', autor:'Machado de Assis', genero: 'Romance', ano_publicacao: 1881 }
        ];
        db.execute.mockResolvedValue([livros]);

        const livrosRomance = await Book.getByGenre('Romance');

        expect(db.execute).toHaveBeenCalledWith('SELECT * FROM books WHERE genero = ?', ['Romance']);
        expect(livrosRomance).toEqual(livros);
    });

    it('shoud call db.execute with the correct query and parameters when create is called', async () => {
        const bookData = { titulo: 'Livro B', autor: 'Autor Y', genero: 'Gênero M', ano_publicacao: 2009 };
        const mockInsertId = 2;
        db.execute.mockResolvedValue([{ insertId: mockInsertId }]);

        const bookId = await Book.create(bookData);

        expect(db.execute).toHaveBeenCalledWith('INSERT INTO books VALUES (?, ?, ?, ?)', 
            [bookData.titulo, bookData.autor, bookData.genero, bookData.ano_publicacao]
        );
        expect(bookId).toBe(mockInsertId);
    });

    it('shoud call db.execute with the correct query and parameters when update is called', async () => {
        const bookId = 1;
        const updatedBookData = { titulo: 'Livro J', autor: 'Autor F', genero: 'Gênero N', ano_publicacao: 2015 };
        const mockAffectedRows = 1;
        db.execute.mockResolvedValue([{ affectedRows: mockAffectedRows }]);

        const affectedRows = await Book.update(bookId, updatedBookData);

        expect(db.execute).toHaveBeenCalledWith('UPDATE books SET titulo = ?, autor = ?, genero = ?, ano_publicacao = ? WHERE id = ?',
            [updatedBookData.titulo, updatedBookData.autor, updatedBookData.genero, updatedBookData.ano_publicacao, bookId]
        );
        expect(affectedRows).toBe(mockAffectedRows);
    });

    it('shoud call db.execute with the correct query and parameters when delete is called', async () => {
        const bookIdToDelete = 3;
        const mockAffectedRows = 1;
        db.execute.mockResolvedValue([{ affectedRows: mockAffectedRows }]);

        const affectedRows = await Book.delete(bookIdToDelete);

        expect(db.execute).toHaveBeenCalledWith('DELETE FROM books WHERE id = ?', [bookIdToDelete]);
        expect(affectedRows).toBe(mockAffectedRows);
    });
});

describe('Book Model - failure', () => {
    it('should throw an error when getAll fails', async () => {
        db.execute.mockRejectedValue(new Error('Database connection failed'));
  
        await expect(Book.getAll()).rejects.toThrow('Database connection failed');
        expect(db.execute).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when getById fails', async () => {
        db.execute.mockRejectedValue(new Error('Invalid query'));
  
        await expect(Book.getById(1)).rejects.toThrow('Invalid query');
    });

    it('should throw an error when getByGenre fails', async () => {
        db.execute.mockRejectedValue(new Error('Genre not found'));
  
        await expect(Book.getByGenre('Invalid')).rejects.toThrow('Genre not found');
        expect(db.execute).toHaveBeenCalledTimes(1);
    });

    it('should throw error when create fails with invalid data', async () => {
        const invalidBookData = { titulo: null };
        db.execute.mockRejectedValue(new Error('Invalid data'));
  
        await expect(Book.create(invalidBookData)).rejects.toThrow('Invalid data');
    });
});

describe('Book Model - special cases', () => {

});

