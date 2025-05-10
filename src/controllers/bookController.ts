import Book from '../models/Book';
import { Request } from 'express';
import { Response } from 'express-serve-static-core';

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

export const getBookByGenre = async (req, res) => {
    const categoria = req.params.genero;
    try {
        const book = await Book.getByGenre(categoria);
        res.json({ book });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getBooksPaginated = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      return res.status(400).json({ error: 'Parâmetros de página ou limite inválidos.' });
    }

    try {
      const results = await Book.getAllPaginated(page, limit);
      res.json(results);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
};

export const addBook = async (req, res) => {
    const { titulo, autor, genero, ano_publicacao } = req.body;
    
    // Validação dos campos obrigatórios
    if (!titulo || !autor || !genero || !ano_publicacao) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        const bookId = await Book.create(req.body);
        res.status(201).json({ id: bookId, message: 'Livro adicionado com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

export const updateBook = async (req, res) => {
    const { titulo, autor, genero, ano_publicacao } = req.body;
    const { id } = req.params;
     
    // Validação dos campos
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