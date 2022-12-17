module.exports = {
    put: {
        tags: ["Students CRUD operations"],
        description: "Update a student",
        operationId: "updateStudent",
        parameters: [
            {
                name: "token",
                in: "header (Authorization Bearer)",
                schema: {
                    $ref: "#/components/schemas/Token",
                },
                required: true,
            }],
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Student",
                    }
                }
            }
        },
        responses: {
            200: {
                description: "Student updated",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Response",
                        }
                    }
                }
            },
            400: {
                description: "Bad request",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Error",
                        }
                    }
                }
            },
            401: {
                description: "Unauthorized",
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