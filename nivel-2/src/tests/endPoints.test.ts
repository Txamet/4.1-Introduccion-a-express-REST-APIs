import request from "supertest";
import { app, server } from "../app";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

beforeAll(async () => {
    process.env.DATABASE_URL = process.env.DATABASE_URL_TEST;
    await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
  server.close();
});


describe('POST/users', () => {
  let id: number;

  it('should create a user and send 200 response ', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'Jon Test' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    id = response.body.id;
  });

  it('should respond with 400 status code when user already exist', async()=>{
    const response = await request(app).post("/users").send({name:'Jon Test'});
    expect(response.status).toBe(400)
  });

  it('should respond with 500 status code when introduce error type of data', async()=>{
    const response = await request(app).post("/users").send({name:125});
    expect(response.status).toBe(500)
  });


  it('Should response with 200 status when update a user 1',async ()=>{
    const response = await request (app)
    .patch('/users/1')
    .send( {name:'Jon Test --edited'})
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Jon Test --edited')

  });

it('should response with 404 status code if user does not exists when try to update it', async()=>{
  const response = await request(app).patch('/users/8').send({name:'Jon Test -- edited'})
  expect(response.status) .toBe(404);
});

it('should respond with 500 status code when introduce error type of data when update an user', async()=>{
  const response = await request(app).patch("/users/1").send({name:125});
  expect(response.status).toBe(500)
});

});
