const db = require("../database/db");

class Book {
  static async getAll() {
    try {
      const [rows] = await db.execute("SELECT * FROM books");
      return rows;
    } catch (error) {
      console.error("Erro ao buscar todos os livro:", error);
      throw error;
    }
  }

  static async getById(id) {
    try {
      const [rows] = await db.execute("SELECT * FROM books WHERE ID = ?", [id]);
      return rows[0];
    } catch (error) {
      console.error("Erro ao encontrar o livro", error);
      throw error;
    }
  }

  static async getByGenre(categoria) {
    const { genero } = categoria;
    try {
      const [rows] = await db.execute("SELECT * FROM books WHERE genero = ?", [
        genero,
      ]);
      return rows;
    } catch (error) {
      console.error(`Erro ao buscar livros do gênero ${genero}:`, error);
      throw error;
    }
  }

  static async getAllPaginated(page: number, limit: number) {
    const offset = (page - 1) * limit;
    try {
      const [rows] = await db.execute("SELECT * FROM books LIMIT ? OFFSET ?", [
        limit,
        offset,
      ]);
      const [countResult] = await db.execute(
        "SELECT COUNT(*) AS total FROM books"
      );
      const totalItems = countResult[0].total;
      const totalPages = Math.ceil(totalItems / limit);

      return {
        items: rows,
        totalItems: totalItems,
        totalPages: totalPages,
        currentPage: page,
        pageSize: limit,
      };
    } catch (error: any) {
      console.error("Erro ao buscar livros paginados:", error);
      throw error;
    }
  }

  static async create(bookData: {titulo: string; autor: string; genero: string; ano_publicacao: number}) {
    // Validação do bookData
    if (!bookData) {
      throw new Error("Dados do livro não fornecidos");
    }
    const { titulo, autor, genero, ano_publicacao } = bookData;
    const currentYear = new Date().getFullYear();

    // Validações dos campos
    if (!titulo || !autor || !genero || !ano_publicacao) {
      throw new Error("Todos os campos são obrigatórios");
    }
    if (!titulo?.trim()) throw new Error("Título do livro é obrigatório");
    if (!autor?.trim()) throw new Error("Autor do livro é obrigatório");
    if (!genero?.trim()) throw new Error("Gênero do livro é obrigatório");
    if (typeof ano_publicacao !== "number" || isNaN(ano_publicacao)) {
      throw new Error("Ano de publicação deve ser um número válido");
    }
    if (ano_publicacao <= 0 || ano_publicacao > currentYear + 1) {
      throw new Error(`Ano de publicação deve estar entre 1 e ${currentYear + 1}`);
    }
    
    try {
      const [result] = await db.execute(
        "INSERT INTO books (titulo, autor, genero, ano_publicacao) VALUES (?, ?, ?, ?)",
        [titulo.trim(), autor.trim(), genero.trim(), ano_publicacao]
      );
      return result.insertId; 
    } catch (error: any) {
      if (error.code === "ER_DUP_ENTRY") {
        throw new Error("Já existe um livro com este título");
      }
      console.error("Erro ao criar livro:", error);
      throw new Error("Falha ao criar livro no banco de dados");
    }
 }

  static async update(id: number, bookData: {titulo?: string; autor?: string; genero?: string; ano_publicacao?: number}) {
    // Validação do bookData
    if (!bookData) {
      throw new Error("Dados do livro não fornecidos"); 
    }
    const { titulo, autor, genero, ano_publicacao } = bookData;

    // Validações dos campos
    if (titulo !== undefined && titulo.trim() === '') {
      throw new Error("Título do livro é obrigatório");
    }
    if (autor !== undefined && autor.trim() === '') {
      throw new Error("Autor do livro é obrigatório");
    }
    if (genero !== undefined && genero.trim() === '') {
      throw new Error("Gênero do livro é obrigatório");
    }
    if (ano_publicacao !== undefined && (typeof ano_publicacao !== "number" || isNaN(ano_publicacao))) {
      throw new Error("Ano de publicação deve ser um número válido");
    }

    try {
      const [result] = await db.execute(
        "UPDATE books SET titulo = ?, autor = ?, genero = ?, ano_publicacao = ? WHERE ID = ?",
        [titulo, autor, genero, ano_publicacao, id]
      );
      return result.affectedRows;
    } catch (error) {
      console.error("Erro ao atualizar o livro", error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const [result] = await db.execute("DELETE FROM books WHERE ID = ?", [id]);
      return result.affectedRows;
    } catch (error) {
      console.error("Erro ao deletar o livro", error);
      throw error;
    }
  }
}

export default Book;
