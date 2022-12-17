module.exports = {
    // method of operation
    get: {
        tags: ["Students CRUD operations"],
        description: "Get all students",
        operationId: "getStudentsName",
        parameters: [],
        responses: {
            200: {
                description: "Students found",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/Student",
                            }
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
            404: {
                description: "Students not found",
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