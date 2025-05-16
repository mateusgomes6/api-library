import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const db = require('../database/db');

const JWT_SECRET = process.env.JWT_SECRET; 

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não definido no .env!");
}

interface AuthRequest extends Request {
    userId?: number;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token não fornecido.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number};
        req.userId = decoded.userId;
        next();
    } catch (error: any) {
        return res.status(401).json({ error: 'Token inválido ou expirado.' });
    }
};