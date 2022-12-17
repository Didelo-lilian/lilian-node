module.exports = {
    // method of operation
    post: {
        tags: ["Students CRUD operations"],
        description: "Create a student",
        operationId: "createStudent",
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
            201: {
                description: "Student created",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    example: "Student created"
                                },
                                student: {
                                    $ref: "#/components/schemas/Student",
                                }
                            }
                        }
                    }
                }
            },
            400: {
                description: "Student not created",
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