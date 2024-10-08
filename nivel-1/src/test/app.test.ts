import request from "supertest";
import {prismaMock} from './client';
import {jest, describe, test, expect, beforeEach, beforeAll, afterAll, afterEach} from '@jest/globals';
const { app } = require("../app")
const { server } = require("../app")

afterAll(() => {
    server.close()
})

describe("GET/contacts", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/contacts").send();
        expect(response.statusCode).toBe(200);
    });

    test("should respond with an array", async () => {
        const response = await request(app).get("/contacts").send();
        expect(response.body).toBeInstanceOf(Array)
    })
});