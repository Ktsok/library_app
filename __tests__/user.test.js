const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../app');
require('dotenv').config();

// Connecting to MongoDB before each test
beforeEach(async () => {
    await mongoose.connect(process.env)
    .then(
        () => console.log("MongoDB connected for Jest"),
        err => console.error("MongoDB connection error for Jest:", err)
    )
});

// Closing the connection after each test
afterEach(async () => {
    await mongoose.connection.close();
});

describe("Requests for /api/users", () => {
    it('GET Returns all users', async () => {
        const res = await request(app)
            .get('/api/users');

        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.lenght).toBeGreaterThan(0);
    }, 10000);
});