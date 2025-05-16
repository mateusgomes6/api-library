import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET; 

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não definido no .env!");
}

export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
    throw new Error('Username, email e password são obrigatórios.');
    }

    try {
        const existingUser = await User.findByUsername(username);
        if (existingUser) {
            throw new Error('Username já existe.');
        }

        const userId = await User.create(username, email, password);
        res.status(201).json({ message: 'Usuário registrado com sucesso.', userId});
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}