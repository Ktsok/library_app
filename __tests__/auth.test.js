const mongoose = require("mongoose");
const request = require("supertest");
const bodyParser = require("body-parser");

const app = require("../app");
const { deleteByUsername } = require("../controllers/user.controller");
require("dotenv").config();

// Connecting to MongoDB before each test
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI).then(
    () => console.log("MongoDB connected for Jest"),
    (err) => console.error("MongoDB connection error for Jest:", err)
  );
});

// Closing the connection after each test
afterEach(async () => {
  await mongoose.connection.close();
});

describe("Tests login", () => {
  it("try to login and get token", async () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    const payload = {
      username: "user1",
      password: "12345",
    };
    const res = await request(app)
      .post("/api/auth/login")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
   


    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data).toBeDefined();
  }, 10000);
});
        
