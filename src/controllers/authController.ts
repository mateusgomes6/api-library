import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET; 

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não definido no .env!");
}
