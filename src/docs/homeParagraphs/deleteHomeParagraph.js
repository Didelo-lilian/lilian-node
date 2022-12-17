module.exports = {
    delete: {
        tags: ["Home Paragraphs CRUD operations"],
        description: "Delete a home paragraphs from a specific language",
        operationId: "deleteHomeParagraphs",
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
                        $ref: "#/components/schemas/HomeParagraphInput",
                    }
                }
            }
        },
        responses: {
            200: {
                description: "Home paragraphs were deleted",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Response",
                        }
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