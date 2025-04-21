const db = require('../database/db');

exports.getAllBooks = async (req, res) => {
    try {
        const[rows] = await db.execute('SELECT * FROM books');
        res.json({ books: rows});
    }   catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getBookById = async (req, res) => {
    const id = req.params.id;
    try {
        const[rows] = await db.execute('SELECT * FROM books WHERE ID = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        } 
        res.json ({ book: rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addBook = async (req, res) => {
    const { titulo, autor, genero, ano_publicacao } = req.body;
    if (!titulo || !autor) {
        res.status(400).json({ error: 'Título e/ou autor são obrigatórios '});
    }
    try {
        const [result] = await db.execute(
          'INSERT INTO books VALUES (?, ?, ?, ?)', 
          [titulo, autor, genero, ano_publicacao]
        );
        res.status(201).json({ id: result.insertId, message: 'Livro adicionado com sucesso.' });
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