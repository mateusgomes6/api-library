const db = require ('../database/db');

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

    static async getById(id) {
        try {
            const[rows] = await db.execute('SELECT * FROM books WHERE ID = ?', [id]);
            return rows[0];
        } catch (error) {
            console.error('Erro ao encontrar o livro', error);
            throw error;
        }
    }

    static async create(bookData) {
        const { titulo, autor, genero, ano_publicacao } = bookData;
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

    static async update(id, bookData) {
        const { titulo, autor, genero, ano_publicacao } = bookData;
        try {
            const [result] = await db.execute (
                'UPDATE books SET titulo = ?, autor = ?, genero = ?, ano_publicacao = ?, WHERE ID = ?',
                [titulo, autor, genero, ano_publicacao, id]
            );
            return result.affectedRows;
        } catch (error) {
            console.error('Erro ao atualizar o livro', error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const [result] = await db.execute(
                'DELETE FROM books WHERE ID = ?', [id]
            );
            return result.affectedRows;
        } catch (error) {
            console.error('Erro ao deletar o livro', error);
            throw error;
        }
    }

}

export default Book;