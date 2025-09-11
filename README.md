# Library Management System API

A robust Node.js server application that exposes a RESTful API for managing a library. It handles user authentication, book inventory, and rental transactions, storing data in MongoDB. The application includes comprehensive logging, API documentation, and a full test suite.

## 🛠️ Built With

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Documentation:** Swagger/OpenAPI 3.1
- **Logging:** Winston with Daily Rotate File and MongoDB transports
- **Testing:** Jest & Supertest

## 📦 Dependencies

The application uses the following key dependencies:

| Package | Version | Purpose |
| :--- | :--- | :--- |
| **express** | ^4.21.2 | Web framework |
| **mongoose** | ^8.13.0 | MongoDB object modeling |
| **jsonwebtoken** | ^9.0.2 | JWT authentication |
| **bcrypt** | 5.1.1 | Password hashing |
| **cors** | ^2.8.5 | Cross-Origin Resource Sharing |
| **swagger-ui-express** | ^5.0.1 | API documentation UI |
| **mongoose-to-swagger** | ^1.5.1 | Generate Swagger from Mongoose models |
| **winston** | ^3.17.0 | Logging library |
| **winston-daily-rotate-file** | ^5.0.0 | Rotating file transport for logs |
| **winston-mongodb** | ^6.0.0 | MongoDB transport for logs |
| **jest** | ^29.7.0 | Testing framework |
| **supertest** | ^7.1.4 | HTTP assertion testing |
| **dotenv** | ^16.6.1 | Environment variable management |
| **cross-env** | ^7.0.3 | Cross-platform environment scripts |

## 🚀 Getting Started

### Prerequisites

- **Node.js:** v18.20.8
- **npm:** 10.8.2
- A running MongoDB instance (local or cloud)

### Installation & Running

1.  **Clone the repository**
    ```bash
    git clone <your-repo-url>
    cd <repository-directory>
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory based on the provided `.env.example` and configure your variables (e.g., `MONGODB_URI`, `JWT_SECRET`).

4.  **Run the application**
    ```bash
    # Execute the test suite
    npm run test

    # Start the development server
    npm run dev
    ```

The server will start, typically on `http://localhost:3000`.

## 📚 API Documentation

Interactive API documentation is automatically generated and available at the following endpoint once the server is running:

**`/api-docs`**

This interface provides a complete overview of all available endpoints, request bodies, responses, and allows you to test the API directly from your browser.

![API Swagger Documentation](https://github.com/user-attachments/assets/44c3ebd1-c3a7-4a68-b9e6-b2d59882b8dc)

### Supported Endpoints

The API is organized into the following resource groups:

- **Auth:** User login and token generation.
- **Users:** Full CRUD operations for managing user accounts.
- **Books:** Full CRUD operations for managing the book inventory.
- **Rentals:** Create, read, and delete operations for managing book rentals.

## 🧪 Testing

The project includes a comprehensive test suite built with Jest and Supertest. To run the tests and verify everything is working correctly, use:

```bash
npm run test
