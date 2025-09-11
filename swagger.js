const m2s = require('mongoose-to-swagger');
const User = require('./models/user.model');
const Book = require('./models/book.model'); // Import the Book model
const Rental = require('./models/rental.model'); // Import the Rental model

exports.options = {
  "components": {
    "schemas": {
      User: m2s(User),
      Book: m2s(Book), // Add Book schema
      Rental: m2s(Rental) // Add Rental schema
    },
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  },
  "security": [
    {"bearerAuth":[]}
  ],
  "openapi":"3.1.0",
  "info":{
    "version": "1.0.0",
    "title": "CRUD API for Library management",
    "description":"An application for library management",
    "contact": {
      "name": "API Support",
      "url": "https://aueb.gr",
      "email":"support@example.com"
    }
  },
  "servers": [
    {
      url:"http://localhost:3000",
      description:"Local Server"
    },
    {
      url:"http://www.backend.aueb.gr",
      description: "Testing server"
    }
  ],
  "tags": [
    {
      "name": "Users",
      "description": "Endpoints for User"
    },
    {
      "name": "Books",
      "description": "Endpoints for books"
    },
    {
      "name": "Rentals",
      "description": "Endpoints for rentals"
    },
    {
      "name":"Auth",
      "description": "Endpoints for Authentication"
    }
  ],
  "paths": {
    // ========== USER PATHS (Your existing code) ==========
    "/api/users": {
      "get": {
        "tags":["Users"],
        "description":"Returns a list of all users",
        "responses":{
          "200":{
            "description": "List of all users",
            "content": {
              "application/json": {
                "schema": {
                  "type":"array",
                  "items": {
                    "$ref":"#/components/schemas/User"
                  }
                }
              }
            }
          }
        }
      },
      "post":{
        "tags": ["Users"],
        "description": "Data of users that we want to create",
        "requestBody":{
          "description": "JSON with user data",
          "content": {
            "application/json": {
              "schema":{
                "type":"object",
                "properties":{
                  "username": {"type":"string"},
                  "password": {"type":"string"},
                  "name": {"type": "string"},
                  "surname": {"type":"string"},
                  "email": {"type":"string"},
                  "address": {
                    "type": "object",
                    "properties": {
                      "area": {"type":"string"},
                      "road": {"type":"string"}
                    }
                  },
                  "phone": {
                    "type":"array",
                    "items": {
                      "type": "object",
                      "properties":{
                        "type": {"type": "string"},
                        "number": {"type": "number"}
                      }
                    }
                  }
                },
                "required":["username", "password", "name", "surname", "email"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "JSON of new user"
          }
        }
      }      
    },
    "/api/users/{id}":{
      "get": {
        "tags": ["Users"],
        "parameters": [
          {
            "name": "id",
            "in":"path",
            "required":true,
            "description": "Id of user that we want to find",
            "schema": { "type": "string" } // Fixed: 'type' -> 'schema'
          }
        ],
        "description": "Returns users details for specific id",
        "responses": {
          "200": {
            "description": "User details",
            "content":{
              "application/json":{
                "schema": {
                  "$ref":"#/components/schemas/User"
                }
              }
            }            
          }
        }
      },
      "patch":{
        "tags": ["Users"],
        "description": "Update user",
        "parameters":[
          {
            "name":"id",
            "in":"path",
            "required":true,
            "description": "Id of user that can update",
            "schema": { "type": "string" } // Fixed: 'type' -> 'schema'
          }
        ],
        "requestBody":{
          "description":"Data of user to update",
          "content": {
            "application/json":{
              "schema": {
                "type":"object",
                "properties":{
                  "username": {"type":"string"},
                  "name": {"type":"string"},
                  "surname": {"type":"string"},
                  "email":{"type": "string"},
                  "address": {
                    "type":"object",
                    "properties":{
                      "area": {"type": "string"},
                      "road": {"type": "string"}
                    }
                  }
                },
                "required": ["email"]
              }
            }
          }
        },
        "responses":{
          "200":{
            "description": "Update user" // Fixed typo: 'descripiton'
          }
        }
      },
      "delete": {
        "tags": ["Users"],
        "description": "Delete user from DB",
        "parameters": [
          {
            "name": "id",
            "in":"path",
            "description": "User to delete",
            "schema": { "type": "string" }, // Fixed: 'type' -> 'schema'
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description":"Delete a user"
          }
        }
      }
    },

    // ========== BOOK PATHS (Newly added) ==========
    "/api/books": {
      "get": {
        "tags":["Books"],
        "description":"Returns a list of all books",
        "responses":{
          "200":{
            "description": "List of all books",
            "content": {
              "application/json": {
                "schema": {
                  "type":"array",
                  "items": {
                    "$ref":"#/components/schemas/Book"
                  }
                }
              }
            }
          }
        }
      },
      "post":{
        "tags": ["Books"],
        "description": "Create a new book",
        "requestBody":{
          "description": "JSON with book data",
          "content": {
            "application/json": {
              "schema":{
                "$ref":"#/components/schemas/Book"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Book created successfully",
            "content": {
              "application/json": {
                "schema": {
                  "$ref":"#/components/schemas/Book"
                }
              }
            }
          }
        }
      }      
    },
    "/api/books/{id}":{
      "get": {
        "tags": ["Books"],
        "parameters": [
          {
            "name": "id",
            "in":"path",
            "required":true,
            "description": "ID of the book to retrieve",
            "schema": { "type": "string" }
          }
        ],
        "description": "Returns details for a specific book",
        "responses": {
          "200": {
            "description": "Book details",
            "content":{
              "application/json":{
                "schema": {
                  "$ref":"#/components/schemas/Book"
                }
              }
            }            
          }
        }
      },
      "patch":{
        "tags": ["Books"],
        "description": "Update a book's details",
        "parameters":[
          {
            "name":"id",
            "in":"path",
            "required":true,
            "description": "ID of the book to update",
            "schema": { "type": "string" }
          }
        ],
        "requestBody":{
          "description":"Data of book to update",
          "content": {
            "application/json":{
              "schema": {
                "$ref":"#/components/schemas/Book"
              }
            }
          }
        },
        "responses":{
          "200":{
            "description": "Book updated successfully"
          }
        }
      },
      "delete": {
        "tags": ["Books"],
        "description": "Delete a book from the library",
        "parameters": [
          {
            "name": "id",
            "in":"path",
            "description": "ID of the book to delete",
            "schema": { "type": "string" },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description":"Book deleted successfully"
          }
        }
      }
    },

    // ========== RENTAL PATHS (Newly added) ==========
    "/api/rentals": {
      "get": {
        "tags":["Rentals"],
        "description":"Returns a list of all rentals",
        "responses":{
          "200":{
            "description": "List of all rentals",
            "content": {
              "application/json": {
                "schema": {
                  "type":"array",
                  "items": {
                    "$ref":"#/components/schemas/Rental"
                  }
                }
              }
            }
          }
        }
      },
      "post":{
        "tags": ["Rentals"],
        "description": "Create a new rental record",
        "requestBody":{
          "description": "JSON with rental data",
          "content": {
            "application/json": {
              "schema":{
                "$ref":"#/components/schemas/Rental"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Rental created successfully",
            "content": {
              "application/json": {
                "schema": {
                  "$ref":"#/components/schemas/Rental"
                }
              }
            }
          }
        }
      }      
    },
    "/api/rentals/{id}":{
      "get": {
        "tags": ["Rentals"],
        "parameters": [
          {
            "name": "id",
            "in":"path",
            "required":true,
            "description": "ID of the rental record to retrieve",
            "schema": { "type": "string" }
          }
        ],
        "description": "Returns details for a specific rental",
        "responses": {
          "200": {
            "description": "Rental details",
            "content":{
              "application/json":{
                "schema": {
                  "$ref":"#/components/schemas/Rental"
                }
              }
            }            
          }
        }
      },
      "delete": {
        "tags": ["Rentals"],
        "description": "Delete a rental record (e.g., when a book is returned)",
        "parameters": [
          {
            "name": "id",
            "in":"path",
            "description": "ID of the rental record to delete",
            "schema": { "type": "string" },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description":"Rental record deleted successfully"
          }
        }
      }
    },

    // ========== AUTH PATH (Your existing code) ==========
    "/api/auth/login": {
      "post": {
        "tags": ["Auth"],
        "description": "Login User",
        "requestBody": {
          "description": "User send username and password and for response we have jwt token",
          "content": {
            "application/json":{
              "schema": {
                "type": "object",
                "properties": {
                  "username": { "type": "string" },
                  "password": { "type": "string" }
                },
                "required": ["username", "password"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Token returned"
          }
        }
      }
    }
  }
}