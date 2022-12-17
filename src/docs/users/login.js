module.exports = {
    // method of operation
    post: {
        tags: ["Users CRUD operations"],
        description: "Login as a user",
        operationId: "login",
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/UserInputLogin",
                    }
                }
            }
        },
        responses: {
            200: {
                description: "User logged in",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/User",
                        }
                    }
                }
            },
            401: {
                description: "Unauthorized | Nonexistent user",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Error",
                        }
                    }
                }
            },
            500: {
                description: "Server error",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Error",
                        }
                    }
                }
            }
        }
    }
}