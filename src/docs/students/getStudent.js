module.exports = {
    // method of operation
    get: {
        tags: ["Students CRUD operations"],
        description: "Get a student",
        operationId: "getStudent",
        parameters: [
            {
                name: "name",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/StudentName",
                },
                required: true,
            }
        ],
        responses: {
            200: {
                description: "Student found",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Student",
                        }
                    }
                }
            },
            404: {
                description: "Student not found",
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