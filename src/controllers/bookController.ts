const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.getAll()
        res.json({ books });
    }   catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getBookById = async (req, res) => {
    const id = req.params.id;
    try {
        const book = await Book.getById(id);
        if (!book) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        } 
        res.json ({ book: });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addBook = async (req, res) => {
    try {
        const bookId = await Book.create(req.body);
        res.status(201).json({ id: bookId, message: 'Livro adicionado com sucesso.' });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};

exports.updateBook = async (req, res) => {
    const id = req.params.id
    const { titulo, autor, genero, ano_publicacao } = req.body;
    try {
        const [result] = await db.execute(
            'UPDATE books SET titulo = ?, autor = ?, genero = ?, ano_publicacao = ?, WHERE ID = ?',
            [titulo, autor, genero, ano_publicacao, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Livro não encontrado.' });
        }
        res.json({ message: 'Livro atualizado com sucesso.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteBook = async (req, res) => {
    const id = req.params.id;
    try {
        const [result] = await db.execute(
            'DELETE FROM books WHERE ID = ?', [id]
        );
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Livro não encontrado.' });
        }
        res.json({ message: 'Livro excluído com sucesso. '})
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};