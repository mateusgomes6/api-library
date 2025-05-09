const request = require('supertest');
const express = require('express');
const bookRoutes = require('../src/routes/bookRoutes');
const Book = require('../src/models/Book');

const app = express();
app.use(express.json());
app.use('/api/books', bookRoutes);

jest.mock('../src/models/Book');

describe('Book Routes - successfully', () => {});

describe('Book Routes - failure', () => {});