const bookController = require('../controllers/bookController');
const Book = require('../models/Book');
const httpMocks = require('node-mocks-http');

beforeEach(() => {
    jest.clearAllMocks();
})

jest.mock('../../src/models/Book');

describe('Book Controller', () => {
});