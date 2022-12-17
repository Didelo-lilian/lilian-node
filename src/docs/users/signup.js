module.exports = {
    // method of operation
    post: {
        tags: ["Users CRUD operations"], // operation's tag.
        description: "Create user", // operation's desc.
        operationId: "createUser", // unique operation id.
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/UserInputSignup",
                    }
                }
            }
        },
        // expected responses
        responses: {
            // response code
            201: {
                description: "User created", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Response",
                        }
                    }
                }
            },
            400: {
                description: "Invalid data", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Error",
                        }
                    }
                }
            },
            401: {
                description: "Unauthorized", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Error",
                        }
                    }
                }
            },
            500: {
                description: "Server error", // response desc.
                content: {
                    // content-type
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