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
}

module.exports = Book;
