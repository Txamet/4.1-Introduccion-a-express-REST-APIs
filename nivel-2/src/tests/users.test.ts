import request from "supertest";
import {app} from "../app";
import { prismaUser } from "../models/users.models";

describe('Users API', () => {
    let userId: number;

    afterAll(async () => {
        await prismaUser.user.deleteMany();
        await prismaUser.$disconnect();
    });

    it('should create a user', async () => {
        const response = await request(app)
            .post("/users")
            .send({
                name: "Jimmy Page"
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        userId = response.body.id;
    });

    it('should update a user name', async () => {
        const response = await request(app)
            .patch(`/users/${userId}`)
            .send({
                name: "Jimmy Page - modified"
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Jimmy Page - modified");
    });
});
