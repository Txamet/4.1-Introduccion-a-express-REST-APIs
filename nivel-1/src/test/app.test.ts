import request from "supertest";
import {jest, describe, test, expect, beforeEach, beforeAll, afterAll, afterEach} from '@jest/globals';
const { app, server } = require("../app")

afterAll(() => {
    server.close();
});

describe("POST/contacts", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).post("/contacts").send({
            "name": "Jhon",
            "last_name": "Doe",
            "email": "jon_doe@gmail.com",
            "phone_number": 600000000
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            "contactId": 1,
            "name": "Jhon",
            "last_name": "Doe",
            "email": "jon_doe@gmail.com",
            "phone_number": 600000000,
            "deleted": false,
            "favorite": false
        })
    });

    test("should respond with a 400 status code when contact already exists", async () => {
        const response = await request(app).post("/contacts").send({
            "name": "Jhon",
            "last_name": "Doe",
            "email": "jon_doe@gmail.com",
            "phone_number": 600000000
        });
        expect(response.statusCode).toBe(400)
    });

    test("should respond with a 500 status code when data format is invalid", async () => {
        const response = await request(app).post("/contacts").send({
            "name": "Jane",
            "last_name": "Doe",
            "email": "jane_doe@gmail.com",
            "phone_number": "600000001"
        });
        expect(response.statusCode).toBe(500)
    });
});    

describe("DELETE/contacts/:contactId", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).delete("/contacts/1").send();
        expect(response.statusCode).toBe(200);
    });
    
    test("should respond with a 404 status code when contact doesn't exists", async () => {
        const response = await request(app).delete("/contacts/2").send();
        expect(response.statusCode).toBe(404);
    });
});

describe("PATCH/contacts/:contactId/recover", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).patch("/contacts/1/recover").send();
        expect(response.statusCode).toBe(200);
    });

    test("should respond with a 404 status code when contact doesn't exists", async () => {
        const response = await request(app).patch("/contacts/2/recover").send();
        expect(response.statusCode).toBe(404);
    });
});

describe("PUT/contacts/:contactId", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).put("/contacts/1").send({          
            "name": "Jhon",
            "last_name": "Doe edited",
            "email": "jon_doe@gmail.com",
            "phone_number": 600000000
        });
        expect(response.statusCode).toBe(200);
    });
    
    test("should respond with a 404 status code when contact doesn't exists", async () => {
        const response = await request(app).put("/contacts/2").send();
        expect(response.statusCode).toBe(404);
    });

    test("should respond with a 500 status code when data format is invalid", async () => {
        const response = await request(app).put("/contacts/1").send({          
            "name": "Jhon",
            "last_name": "Doe edited",
            "email": "jon_doe@gmail.com",
            "phone_number": "600000000"
        });
        expect(response.statusCode).toBe(500);
    });
});

describe("PATCH/contacts/:contactId/favorite", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).patch("/contacts/1/favorites").send();
        expect(response.statusCode).toBe(200);
    });

    test("should alternate favorite value", async () => {
        const before = await request(app).get("/contacts").send();

        const response = await request(app).patch("/contacts/1/favorites").send();
        expect(response.statusCode).toBe(200);

        const result = await request(app).get("/contacts").send();
        expect(result.body[0].favorite).toEqual(!before.body[0].favorite);
    });

    test("should respond with a 404 status code when contact doesn't exists", async () => {
        const response = await request(app).put("/contacts/2/favorites").send();
        expect(response.statusCode).toBe(404);
    });
});

describe("GET/contacts", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/contacts").send();
        expect(response.statusCode).toBe(200);
    });

    test("should respond with an array", async () => {
        const response = await request(app).get("/contacts").send();
        expect(response.body).toBeInstanceOf(Array);
    });

    test("should have the length of the array by 1", async () => {
        const response = await request(app).get("/contacts").send();
        expect(response.body.length).toBe(1);
    });

    test("should respond with a 200 status code if array length is 0", async () => {
        const before = await request(app).delete("/contacts/1").send();

        const response = await request(app).get("/contacts").send();
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ 
            "error": "Contacts list is empty"
         });

        const result = await request(app).patch("/contacts/1/recover").send();
    });
});
