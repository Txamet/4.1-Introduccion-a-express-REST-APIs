import request from "supertest";
import {app} from "../app"; // Asegúrate de exportar tu app en el archivo app.ts
import { prisma } from "../models/db.models";

describe('Contacts API', () => {
    let userId: number;
    let contactId: number;

    beforeAll(async () => {
        // Crear un usuario antes de realizar las pruebas
        const user = await prisma.user.create({
            data: { name: "Test User" }
        });
        userId = user.id;
    });

    afterAll(async () => {
        // Limpiar base de datos después de las pruebas
        await prisma.contact.deleteMany();
        await prisma.user.deleteMany();
        await prisma.$disconnect();
    });

    it('should create a contact for a user', async () => {
        const response = await request(app)
            .post(`/contacts/${userId}`)
            .send({
                name: "John",
                last_name: "Doe",
                email: "john.doe@example.com",
                phone_number: 123456789
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('contactId');
        contactId = response.body.contactId;
    });

    it('should get user contacts ordered by name', async () => {
        const response = await request(app).get(`/contacts/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].name).toBe("John");
    });

    it('should update a contact', async () => {
        const response = await request(app)
            .put(`/contacts/${contactId}`)
            .send({
                name: "John Updated",
                last_name: "Doe Updated",
                email: "john.updated@example.com",
                phone_number: 987654321
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John Updated");
    });

    it('should mark a contact as favorite', async () => {
        const response = await request(app)
            .patch(`/contacts/${contactId}/favorites`);

        expect(response.status).toBe(200);
        expect(response.text).toBe("\"Contact is favorite now\"");
    });

    it('should delete a contact', async () => {
        const response = await request(app)
            .delete(`/contacts/${contactId}`);

        expect(response.status).toBe(200);
        expect(response.text).toBe("\"Contact deleted\"");
    });

    it('should recover a deleted contact', async () => {
        const response = await request(app)
            .patch(`/contacts/${contactId}/recover`);

        expect(response.status).toBe(200);
        expect(response.text).toBe("\"Contact recovered\"");
    });
});
