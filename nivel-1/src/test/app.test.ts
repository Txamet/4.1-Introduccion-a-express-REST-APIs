import request from "supertest";
import { describe, test, expect, afterAll } from '@jest/globals';
const { app, server } = require("../app")

afterAll(() => {
    server.close();
});

describe("POST/contacts", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).post("/contacts").send({
            "name": "John",
            "last_name": "Doe",
            "email": "john_doe@gmail.com",
            "phone_number": 600000000
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            "contactId": 1,
            "name": "John",
            "last_name": "Doe",
            "email": "john_doe@gmail.com",
            "phone_number": 600000000,
            "deleted": false,
            "favorite": false
        });
    });

    test("should respond with a 409 status code when contact already exists", async () => {
        const response = await request(app).post("/contacts").send({
            "name": "John",
            "last_name": "Doe",
            "email": "john_doe@gmail.com",
            "phone_number": 600000000
        });
        expect(response.statusCode).toBe(409);
        expect(response.body).toEqual({error: "Contact already exists"});
    });

    test("should respond with a 500 status code when data format is invalid", async () => {
        const response = await request(app).post("/contacts").send({
            "name": "Jane",
            "last_name": "Doe",
            "email": "jane_doe@gmail.com",
            "phone_number": "600000001"
        });
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({error: "Error creating contact: Invalid format of data"});
    });
});    

describe("DELETE/contacts/:contactId", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).delete("/contacts/1").send();
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({success: "Contact deleted"});
    });
    
    test("should respond with a 404 status code when contact doesn't exists", async () => {
        const response = await request(app).delete("/contacts/2").send();
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({error: "Contact not found"});
    });

    test("should respond with a 500 status code when occurs an unexpected error", async () => {
        const response = await request(app).delete("/contacts/test").send();
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({error: "Error trying to delete contact"});
    });
});

describe("PATCH/contacts/:contactId/recover", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).patch("/contacts/1/recover").send();
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({success: "Contact recovered"});
    });

    test("should respond with a 404 status code when contact doesn't exists", async () => {
        const response = await request(app).patch("/contacts/2/recover").send();
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({error: "Contact not found"});
    });

    test("should respond with a 409 status code when contact email already exists", async () => {
        const createSecondContact = await request(app).post("/contacts").send({
            "name": "Jane",
            "last_name": "Doe",
            "email": "jane_doe@gmail.com",
            "phone_number": 600000001
        });
        const deleteSecondContact = await request(app).delete("/contacts/2").send();
        const createThirdContact = await request(app).post("/contacts").send({
            "name": "Jane",
            "last_name": "Doe",
            "email": "jane_doe@gmail.com",
            "phone_number": 600000001
        });
        const response = await request(app).patch("/contacts/2/recover").send();
        expect(response.statusCode).toBe(409);
        expect(response.body).toEqual({error: "Contact already exists with another contactId"});
    });

    test("should respond with a 500 status code when occurs an unexpected error", async () => {
        const response = await request(app).patch("/contacts/test/recover").send();
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({error: "Error retrieving contact"});
    });    
});

describe("PUT/contacts/:contactId", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).put("/contacts/1").send({            
            "last_name": "Doe edited",
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            "contactId": 1,
            "name": "John",
            "last_name": "Doe edited",
            "email": "john_doe@gmail.com",
            "phone_number": 600000000,
            "deleted": false,
            "favorite": false
        });
    });
    
    test("should respond with a 404 status code when contact doesn't exists", async () => {
        const response = await request(app).put("/contacts/2").send();
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({error: "Contact not found"});
    });

    test("should respond with a 500 status code when data format is invalid", async () => {
        const response = await request(app).put("/contacts/1").send({          
            "name": "John",
            "last_name": "Doe edited",
            "email": "john_doe@gmail.com",
            "phone_number": "600000000"
        });
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({error: "Error retrieving contact"});
    });
});

describe("PATCH/contacts/:contactId/favorite", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).patch("/contacts/1/favorites").send();
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual("Contact is favorite now");
    });

    test("should alternate favorite value", async () => {
        const before = await request(app).get("/contacts").send();

        const response = await request(app).patch("/contacts/1/favorites").send();
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual("Contact is no longer a favorite");

        const result = await request(app).get("/contacts").send();
        expect(result.body[0].favorite).toEqual(!before.body[0].favorite);
    });

    test("should respond with a 404 status code when contact doesn't exists", async () => {
        const response = await request(app).patch("/contacts/2/favorites").send();
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({error: "Contact not found"});
    });

    test("should respond with a 500 status code when occurs an unexpected error", async () => {
        const response = await request(app).patch("/contacts/test/favorites").send();
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({error: "Error retrieving contact"});
    });  
});

describe("GET/contacts", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/contacts").send();
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([{
            "contactId": 1,
            "name": "John",
            "last_name": "Doe edited",
            "email": "john_doe@gmail.com",
            "phone_number": 600000000,
            "deleted": false,
            "favorite": false
        },{
            "contactId": 3,
            "name": "Jane",
            "last_name": "Doe",
            "email": "jane_doe@gmail.com",
            "phone_number": 600000001,
            "deleted": false,
            "favorite": false
        }]);
    });

    test("should respond with a 200 status code if array length is 0", async () => {
        const deleteFirstContact = await request(app).delete("/contacts/1").send();
        const deleteThirdContact = await request(app).delete("/contacts/3").send();

        const response = await request(app).get("/contacts").send();
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual("Contacts list is empty");
    });
});
