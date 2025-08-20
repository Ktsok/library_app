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

describe("Requests for /api/rental/test", () => {
    it('GET Returns all rentals', async () => {
        const res = await request(app)
            .get('/api/rentals/test');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.length).toBeGreaterThan(0);
    }, 10000);
});

describe("Tests that all rentals have book, ", () => {
    it('GET Returns all rentals', async () => {
        const res = await request(app)
            .get('/api/rentals/test');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.length).toBeGreaterThan(0);
        res.body.data.forEach(rental => {
            expect(rental.book).toBeDefined();
        });
    }, 10000);
});

describe("Tests that all rentals have user, ", () => {
    it('GET Returns all rentals', async () => {
        const res = await request(app)
            .get('/api/rentals/test');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.length).toBeGreaterThan(0);
        res.body.data.forEach(rental => {
            expect(rental.user).toBeDefined(); 
        });
    }, 10000);
});