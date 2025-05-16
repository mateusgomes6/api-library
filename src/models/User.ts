const db = require('../database/db');
import bcrypt from 'bcrypt';

class User {
    static async create (username: string, email: string, password: string): Promise<number> {
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
        const result = await db.execute(
            'INSERT INTO users VALUES (?, ?, ?)', [username, email, hashedPassword]
        );
        return result.insertId;
       } catch (error: any) {
        console.error('Erro ao criar usuário:', error);
        throw error;
       }
    }
}