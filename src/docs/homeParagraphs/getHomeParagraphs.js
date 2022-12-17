module.exports = {
    get: {
        tags: ["Home Paragraphs CRUD operations"],
        description: "Get all home paragraphs from all languages",
        operationId: "getHomeParagraphs",
        parameters: [],
        responses: {
            200: {
                description: "Home paragraphs were obtained",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/HomeParagraph",
                        }
                    }
                }
            }
        },
        404: {
            description: "Home paragraphs not found",
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