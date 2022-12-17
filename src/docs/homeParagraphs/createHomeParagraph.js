module.exports = {
    post: {
        tags: ["Home Paragraphs CRUD operations"],
        description: "Create a home paragraph",
        operationId: "createHomeParagraph",
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
            201: {
                description: "Home paragraph created",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Response",
                        }
                    }
                }
            },
            400: {
                description: "Home paragraph not created",
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
            }
        }
    }
}