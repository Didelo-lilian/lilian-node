module.exports = {
    get: {
        tags: ["Students Lessons CRUD operations"],
        description: "Get student utils",
        operationId: "getStudentUtils",
        responses: {
            200: {
                description: "Student utils found",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/UtilsStudent",
                            }
                        }
                    }
                }
            },
            404: {
                description: "Student utils not found",
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