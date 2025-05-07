const db = require ('../database/db')

class Book {
    static async getAll() {
        try {
            const[rows] = await db.execute('SELECT * FROM books');
            return rows;
        } catch (error) {
            console.error('Erro ao buscar todos os livro:', error);
            throw error;
        }
    }

    static async getById(id) {
        try {
            const[rows] = await db.execute('SELECT * FROM books WHERE ID = ?', [id]);
            return rows[0];
        } catch (error) {
            console.error('Erro ao encontrar o livro', error);
            throw error;
        }
    }

    static async create(BookData) {
        const { titulo, autor, genero, ano_publicacao } = req.body;
        try {
            const [result] = await db.execute(
                'INSERT INTO books VALUES (?, ?, ?, ?)', 
                [titulo, autor, genero, ano_publicacao]
            );
            return result.insertId;
        } catch (error) {
            console.error('Error ao criar o livro', error);
            throw error;
    }

}

module.exports = Book;
