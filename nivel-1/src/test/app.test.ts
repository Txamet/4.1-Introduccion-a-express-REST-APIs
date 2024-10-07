import request from "supertest";
import {prismaMock} from './client';
import {jest, describe, test, expect, beforeEach, beforeAll, afterAll, afterEach} from '@jest/globals';
const { app } = require("../app")
const { server } = require("../app")

describe("User API", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        server.close()
      })

    test("POST/contacts should create a new contact", async () => {
        const newContact = {
            contactId: 1,
            name: "Samantha",
            last_name: "Doe",
            email: "sam_doe@gmail.com",
            phone_number: 600000021,
            favorite: false,
            deleted: false
        };

        prismaMock.contact.create.mockResolvedValue(newContact);

        const response = await request(app)
            .post("/contacts")
            .send({
                name: "Samantha",
                last_name: "Doe",
                email: "sam_doe@gmail.com",
                phone_number: 600000021
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(newContact);
    });

    test("GET/contacts should return all contacts", async () => {
        const showContacts = [
            {
                contactId: 1,
                name: "Samantha",
                last_name: "Doe",
                email: "sam_doe@gmail.com",
                phone_number: 600000021,
                favorite: false,
                deleted: false
            },
            {
                contactId: 2,
                name: "John",
                last_name: "Doe",
                email: "john@gmail.com",
                phone_number: 600000000,
                favorite: false,
                deleted: false
            }];

        prismaMock.contact.findMany.mockResolvedValue(showContacts);

        const response = await request(app).get("/contacts");

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(showContacts);
    });

    test("DELETE/contacts/1 should soft delete a contact by id", async () => {
        const newContact = {
            contactId: 1,
            name: "Samantha",
            last_name: "Doe",
            email: "sam_doe@gmail.com",
            phone_number: 600000021,
            favorite: false,
            deleted: false
        };
        prismaMock.contact.create.mockResolvedValue(newContact);
        prismaMock.contact.update.mockResolvedValue({contactId: 1, deleted: true});

        const response = await request(app).delete("/contacts/1");

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({})
    });

    test('PUT /api/users/:id should update a user by id', async () => {
        const updateContact = {
            contactId: 1,
            name: "Samantha",
            last_name: "Doe edited",
            email: "sam_doe@gmail.com",
            phone_number: 600000021,
            favorite: false,
            deleted: false
        };
        prismaMock.user.update.mockResolvedValue(updateContact);
    
        const response = await request(app)
          .put('/contacts/1')
          .send({            
            name: "Samantha",
            last_name: "Doe edited",
            email: "sam_doe@gmail.com",
            phone_number: 600000021
            });
    
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(updateContact);
      });
})