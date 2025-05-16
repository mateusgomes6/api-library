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

    static async findByUsername (username: string): Promise<any> {
        try {
            const [rows] = await db.execute(
                'SELECT * FROM user WHERE username = ?', [username]
            );
            return rows[0];
        } catch (error: any) {
            console.error('Erro ao buscar o usuário por username', error);
            throw error;
        }
    }

    static async comparePassword (password: string, password_hash: string): Promise<boolean> {
        return await bcrypt.compare(password, password_hash);
    }
}

export default User;