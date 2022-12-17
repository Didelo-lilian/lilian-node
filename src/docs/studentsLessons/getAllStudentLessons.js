module.exports = {
    get: {
        tags: ["Students Lessons CRUD operations"],
        description: "Get all students lessons",
        operationId: "getAllStudentLessons",
        responses: {
            200: {
                description: "Student utils found",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/StudentLesson",
                            }
                        }
                    }
                }
            },
            404: {
                description: "Student Lesson not found",
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