const m2s = require('mongoose-to-swagger');
const User = require('./models/user.model');
const Product = require('./models/product.model');

exports.options = {
    "openapi": "3.1.0",
    "info": {
        "version": "1.0.0",
        "title": "Products CRUD API",
        "description": "Products And Users application",
        "contact": {
            "name": "Coding Factory",
            "url": "https://www.example.com",
            "email": "support@example.com"
        }
    },
    "components": {
        "schemas": {
            User: m2s(User),
            Product: m2s(Product)
        }
    },
    "servers": [
        {
            url: "http://localhost:3000",
            description: "Local Server"
        },
        {
            url: "https://wwww.example.com",
            description: "Testing Server"
        }
    ],
    "tags": [
        {
            "name": "Users",
            "description": "Requests for user"
        },
        {
            "name": "Users and Products",
            "description": "Requests for user's products"
        },
        {
            "name": "Products",
            "description": "Requests for product"
        }
    ],
    "paths": {
        "/api/users": {
            "get": {
                "tags": ["Users"],
                "description": "Returns all users",
                "responses": {
                    "200": {
                        "description": "List of all users",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/User"
                                    }
                                }
                            }
                        }
                    }
                }
            },

            "post": {
                "tags": ["Users"],
                "description": "Creates new user",
                "requestBody": {
                    "description": "Data for user that we create",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "username": { "type": "string" },
                                    "password": { "type": "string" },
                                    "name": { "type": "string" },
                                    "surname": { "type": "string" },
                                    "email": { "type": "string" },
                                    "address": {
                                        "type": "object",
                                        "properties": {
                                            "area": { "type": "string" },
                                            "road": { "type": "string" }
                                        }
                                    },
                                    "phone": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "type": { "type": "string" },
                                                "number": { "type": "string" }
                                            }
                                        }
                                    }
                                },
                                "required": ["username", "password", "name", "surname"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "New user is created"
                    }
                }
            }
        },

        "/api/users/{username}": {
            "get": {
                "tags": ["Users"],
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "Username of user that we want to find",
                        "type": "string"
                    }
                ],
                "description": "Get user with specific username",
                "responses": {
                    "200": {
                        "description": "User result",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    }
                }
            },

            "patch": {
                "tags": ["Users"],
                "description": "Update user",
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "Username of user that we want to update",
                        "type": "string"
                    }
                ],
                "requestBody": {
                    "description": "User to update",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "name": { "type": "string" },
                                    "surname": { "type": "string" },
                                    "email": { "type": "string" },
                                    "address": {
                                        "type": "object",
                                        "properties": {
                                            "area": { "type": "string" },
                                            "road": { "type": "string" }
                                        }

                                    }
                                },
                                "required": ["email"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Update user",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    }
                }
            },

            "delete": {
                "tags": ["Users"],
                "description": "Delete user",
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "Username of user that we want to delete",
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Delete a user"
                    }
                }
            }
        },

        "/api/user-products/users/products": {
            "get": {
                "tags": ["Users and Products"],
                "description": "Returns all users with their products",
                "responses": {
                    "200": {
                        "description": "All users with their products"
                    }
                }
            }
        },

        "/api/user-products/{username}/products": {
            "get": {
                "tags": ["Users and Products"],
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "Username of user to find products",
                        "type": "string"
                    }
                ],
                "description": "Username and Products",
                "responses": {
                    "200": {
                        "description": "User and Products to find"
                    }
                }
            },

            "post": {
                "tags": ["Users and Products"],
                "description": "Add new products to user",
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "Username of user to find products",
                        "type": "string"
                    }
                ],
                "requestBody": {
                    "description": "Data to add products",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "products": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "product": { "type": "string" },
                                                "cost": { "type": "number" },
                                                "quantity": { "type": "number" }
                                            }
                                        }
                                    }

                                },
                                "required": ["quantity"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "New products to user"
                    }
                }
            }
        },

        "/api/user-products/{username}/products/{id}": {
            "patch": {
                "tags": ["Users and Products"],
                "description": "Update user's product",
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "Username of user",
                        "type": "String"
                    },
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "Id of product to update",
                        "type": "string"
                    }
                ],
                "requestBody": {
                    "description": "Quantity of product to update",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "product": {
                                        "type": "object",
                                        "properties": {
                                            "quantity": { "type": "number" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Update product from user",
                    }
                }
            },

            "delete": {
                "tags": ["Users and Products"],
                "description": "Delete a product from user",
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "Username of user",
                        "type": "String"
                    },
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "Id of product to delete",
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Delete a product from user"
                    }
                }
            }
        },

        "/api/user-products/stats1": {
            "get": {
                "tags": ["Users and Products"],
                "description": "Total amount and count of each product per user",
                "responses": {
                    "200": {
                        "description": "Total amount and count of each product per user"
                    }
                }
            }
        },

        "/api/user-products/{username}/stats2": {
            "get": {
                "tags": ["Users and Products"],
                "description": "Total amount and count of each product for selected user",
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "Username of user",
                        "type": "String"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Total amount and count of each product for selected user"
                    }
                }
            }
        },

        "/api/products": {
            "get": {
                "tags": ["Products"],
                "description": "Returns all products",
                "responses": {
                    "200": {
                        "description": "List of all products",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Product"
                                    }
                                }
                            }
                        }
                    }
                }
            },

            "post": {
                "tags": ["Products"],
                "description": "Creates new product",
                "requestBody": {
                    "description": "Data for product that we create",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "product": { "type": "string" },
                                    "cost": { "type": "number" },
                                    "description": { "type": "string" },
                                    "quantity": { "type": "number" },
                                },
                                "required": ["product", "cost", "quantity"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "New product is created"
                    }
                }
            }
        },

        "/api/products/{id}": {
            "get": {
                "tags": ["Products"],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "Id of product that we want to find",
                        "type": "string"
                    }
                ],
                "description": "Get product with specific id",
                "responses": {
                    "200": {
                        "description": "Product result",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Product"
                                }
                            }
                        }
                    }
                }
            },

            "patch": {
                "tags": ["Products"],
                "description": "Update product",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "Id of product that we want to update",
                        "type": "string"
                    }
                ],
                "requestBody": {
                    "description": "Product to update",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "product": { "type": "string" },
                                    "cost": { "type": "number" },
                                    "description": { "type": "string" },
                                    "quantity": { "type": "number" },
                                },
                                "required": ["cost", "quantity"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Update product",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Product"
                                }
                            }
                        }
                    }
                }
            },

            "delete": {
                "tags": ["Products"],
                "description": "Delete product",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "Id of product that we want to delete",
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Delete a product"
                    }
                }
            }

        }

    }
}