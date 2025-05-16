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
      return res.status(400).json({ error: 'Username, email e password são obrigatórios.' });
    }

    try {
        const existingUser = await User.findByUsername(username);
        if (existingUser) {
            return res.status(409).json({ error: 'Username já existe.' });
        }

        const userId = await User.create(username, email, password);
        res.status(201).json({ message: 'Usuário registrado com sucesso.', userId });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username e password são obrigatórios' });
    }

    try {
        const user = await User.findByUsername(username);
        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const passwordValid = await User.comparePassword(password, user.password_hash);
        if (!passwordValid) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};