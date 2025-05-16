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
        throw new Error('Token de autenticação não fornecido.')
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number};
        req.userId = decoded.userId;
        next();
    } catch (error: any) {
        throw new Error('Token inválido.')
    }
};