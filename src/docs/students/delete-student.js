module.exports = {
    delete: {
        tags: ["Students CRUD operations"],
        description: "Delete a student",
        operationId: "deleteStudent",
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
                        $ref: "#/components/schemas/StudentName",
                    }
                }
            }
        },
        responses: {
            200: {
                description: "Student deleted",
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