import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const db = require('../database/db');

const JWT_SECRET = process.env.JWT_SECRET; 

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não definido no .env!");
}