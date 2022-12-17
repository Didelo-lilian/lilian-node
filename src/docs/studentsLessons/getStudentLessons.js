module.exports = {
    get: {
        tags: ["Students Lessons CRUD operations"],
        description: "Get student lessons by student name",
        operationId: "getStudentLessons",
        parameters: [
            {
                name: "student",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/StudentName"
                },
                required: true,

            },
        ],
        responses: {
            200: {
                description: "Student lessons were obtained",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/StudentLesson"
                            }
                        }
                    }
                }
            },
            404: {
                description: "Student lessons were not obtained",
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
                },
            }
        }
    }
}