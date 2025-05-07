import Book from '../models/Book';

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.getAll()
        res.json({ books });
    }   catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getBookById = async (req, res) => {
    const id = req.params.id;
    try {
        const book = await Book.getById(id);
        if (!book) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        } 
        res.json ({ book });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addBook = async (req, res) => {
    try {
        const bookId = await Book.create(req.body);
        res.status(201).json({ id: bookId, message: 'Livro adicionado com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

export const updateBook = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await Book.update(id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Livro não encontrado.' });
        }
        res.json({ message: 'Livro atualizado com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteBook = async (req, res) => {
    const id = req.params.id;
    try {
        const affectedRows = await Book.delete(id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Livro não encontrado.' });
        }
        res.json({ message: 'Livro excluído com sucesso.' })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};