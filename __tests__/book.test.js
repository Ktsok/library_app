const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../app');
require('dotenv').config();

// Connecting to MongoDB before each test
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    .then(
        () => console.log("MongoDB connected for Jest"),
        err => console.error("MongoDB connection error for Jest:", err)
    )
});

// Closing the connection after each test
afterEach(async () => {
    await mongoose.connection.close();
});

describe("Requests for /api/books", () => {
    it('GET Returns all books', async () => {
        const res = await request(app)
            .get('/api/books/test');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.length).toBeGreaterThan(0);
    }, 10000);
});

describe("Tests that all books have title, ", () => {
    it('GET Returns all books', async () => {
        const res = await request(app)
            .get('/api/books/test');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.length).toBeGreaterThan(0);
        res.body.data.forEach(book => {
            expect(book.title).toBeDefined();
        });
    }, 10000);
});

describe("Tests that all books have author, ", () => {
    it('GET Returns all books', async () => {
        const res = await request(app)
            .get('/api/books/test');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.length).toBeGreaterThan(0);
        res.body.data.forEach(book => {
            expect(book.author).toBeDefined(); 
        });
    }, 10000);
}); 