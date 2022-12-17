module.exports = {
    components: {
        schemas: {
            User: {
                type: "object",
                properties: {
                    userId: {
                        type: "string",
                        description: "User identification number",
                        example: "tyuio"
                    },
                    token: {
                        type: "string",
                        description: "User token",
                        example: "tyuio"
                    }
                }
            },
            UserInputLogin: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                        description: "User email",
                        pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$",
                        example: "contact@didelo.fr"
                    },
                    password: {
                        type: "string",
                        description: "User password",
                        example: "tyuio"
                    }
                }
            },
            UserInputSignup: {
                type: "object",
                properties: {
                    admin_password: {
                        type: "string",
                        description: "Admin password(only for creating an admin)",
                        example: "tyuio"
                    },
                    email: {
                        type: "string",
                        description: "User email",
                        pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$",
                        example: "contact@didelo.fr"
                    },
                    password: {
                        type: "string",
                        description: "User password",
                        example: "tyuio"
                    }
                }
            },
            HomeParagraph: {
                type: "object",
                properties: {

                    noLanguage: {
                        type: "int",
                        description: "No language",
                        example: 0
                    },
                    paragrahs: {
                        type: "array",
                        items: {
                            type: "string",
                            description: "Paragraph",
                            example: "This is a paragraph"
                        }
                    }
                }
            },
            StudentName: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        description: "Student name (no spaces, no special characters, no uppercase)",
                        example: "john-doe"
                    }
                }
            },
            Student: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        description: "Student name",
                        example: "John Doe"
                    },
                    level: {
                        type: "string",
                        description: "Student level",
                        example: "A1"
                    }
                }
            },
            StudentLesson: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        description: "Student name",
                        example: "John Doe"
                    },
                    months: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                month: {
                                    type: "string",
                                    description: "Month",
                                    pattern: "^[0-9]{2}/[0-9]{4}$",
                                    example: "10/2022"
                                },
                                lessons: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            title: {
                                                type: "string",
                                                description: "Lesson title",
                                                example: "Lesson 1"
                                            },
                                            link: {
                                                type: "string",
                                                description: "Lesson link (dont click on it)",
                                                example: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                            },
                                            day: {
                                                type: "int",
                                                description: "Lesson day",
                                                example: 1
                                            }
                                        }
                                    }
                                }
                            }

                        }
                    }
                }
            },
            Token: {
                type: "object",
                properties: {
                    token: {
                        type: "string",
                        description: "User token",
                        example: "tyuio"
                    }
                }
            },
            Error: {
                type: "object",
                properties: {
                    error: {
                        type: "string",
                        description: "Error message",
                        example: "xxx not found"
                    }
                }
            },
            Response: {
                type: "object",
                properties: {
                    message: {
                        type: "string",
                        description: "Error message",
                        example: "xxx not found"
                    }
                }
            }
        }
    }
}