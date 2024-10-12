import request from "supertest";
import { app, server } from "../app";
import prisma from '../prismaClient'

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

  it('should respond with 400 status code when user already exist', async () => {
    const response = await request(app).post("/users").send({ name: 'Jon Test' });
    expect(response.status).toBe(400)
  });

  it('should respond with 500 status code when introduce error type of data', async () => {
    const response = await request(app).post("/users").send({ name: 125 });
    expect(response.status).toBe(500)
  });
});

describe('PATCH/users/:userId', () => {

  it('Should response with 200 status when update a user 1', async () => {
    const response = await request(app)
      .patch('/users/1')
      .send({ name: 'Jon Test --edited' })
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Jon Test --edited')

  });

  it('should response with 404 status code if user does not exists when try to update it', async () => {
    const response = await request(app).patch('/users/8').send({ name: 'Jon Test -- edited' })
    expect(response.status).toBe(404);
  });

  it('should respond with 500 status code when introduce error type of data when update an user', async () => {
    const response = await request(app).patch("/users/1").send({ name: 125 });
    expect(response.status).toBe(500)
  });

});


describe('POST/contacts/:contactId', () => {

  it('should response with status code 200 when create  contact  1 for user 1', async () => {
    const response = await request(app)
      .post(`/contacts/1`)
      .send({
        name: "Jhon",
        last_name: "Doe",
        email: "jhon.doe@example.com",
        phone_number: 600000000
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      "contactId": 1,
      "name": "Jhon",
      "last_name": "Doe",
      "email": "jhon.doe@example.com",
      "phone_number": 600000000,
      "deleted": false,
      "favorite": false,
      "userId": 1
    });
  });

  it('should response with status code 400   contact  already exist', async () => {
    const response = await request(app)
      .post(`/contacts/1`)
      .send({
        name: "Jhon",
        last_name: "Doe",
        email: "jhon.doe@example.com",
        phone_number: 600000000
      });
    expect(response.status).toBe(400);
  });


  it("should respond with a 500 status code when data format is invalid", async () => {
    const response = await request(app).post("/contacts/1").send({
      "name": "Jane",
      "last_name": "Doe",
      "email": "jane_doe@gmail.com",
      "phone_number": "600000001"
    });
    expect(response.statusCode).toBe(500)
  });
});

describe('DELETE/contacts/:contactId', () => {

  it('Should reponse with status code 200 when deleted a contactId = 1', async () => {
    const response = await request(app).delete("/contacts/1")
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      "message": "Contact deleted"
    });
  });

  it("Should reponse with status code 404 when  try deleted a contact thst doesn't exists", async () => {
    const response = await request(app).delete("/contacts/1")
    expect(response.statusCode).toBe(404);
  });

});

describe('PATCH/contacts/:contactId/recover', () => {

  it("should respond with a 200 status code when recover  a deleted contact", async () => {
    const response = await request(app).patch("/contacts/1/recover");
    expect(response.statusCode).toBe(200);
  });

  it("should respond with a 404 status code when try to recover a deleted contact that doesn't exists", async () => {
    const response = await request(app).patch("/contacts/2/recover");
    expect(response.statusCode).toBe(404);
  });
});

describe('PUT/contacts/:contactId', () => {

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
    const response = await request(app).patch("/contacts/1/favorites");
    expect(response.statusCode).toBe(200);
  });

  test("should alternate favorite value", async () => {
    const before = await request(app).get("/contacts");

    const response = await request(app).patch("/contacts/1/favorites");
    expect(response.statusCode).toBe(200);

    const result = await request(app).get("/contacts");
    expect(result.body[0].favorite).toEqual(!before.body[0].favorite);
  });

  test("should respond with a 404 status code when contact doesn't exists", async () => {
    const response = await request(app).put("/contacts/2/favorites");
    expect(response.statusCode).toBe(404);
  });
});

describe("GET/contacts/:userId", () => {

  it('should respond with 200 status code when get user contacts ordered by name', async () => {
    await request(app).post("/contacts/1")
      .send({
        name: "Alice",
        last_name: "Smith",
        email: "alice.smith@example.com",
        phone_number: 600000001
      });
    await request(app).post("/contacts/1")
      .send({
        name: "Daniel",
        last_name: "Jonson",
        email: "Dajons@example.com",
        phone_number: 600000002
      });

    const response = await request(app).get("/contacts/1");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(1);
    expect(response.body[0].name).toBe("Alice");
    expect(response.body[1].name).toBe("Daniel");
    expect(response.body[2].name).toBe("Jhon");
  });

  it('should respond with 404 status code when  user does not exist', async () => {
    const response = await request(app).get("/contacts/3");
    expect(response.status).toBe(404);

  });
  it('should respond with 200 status code when  user  exist but have not contacts on a list', async () => {
    await request(app).post("/users")
      .send({
        name: "Paquito"
      });
    const response = await request(app).get("/contacts/2");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Contact list is empty");
  });

});


describe("GET/contacts/:userId/favorites", () => {
  it('should respond with 200 status code when list favorites contacts ordered by name', async () => {
    await request(app).patch("/contacts/1/favorites");
    await request(app).patch("/contacts/3/favorites")
    const response = await request(app).get("/contacts/1/favorites");
    expect(response.status).toBe(200);
    expect(response.body[0].name).toBe("Daniel")
    expect(response.body[1].name).toBe("Jhon")

  });

  it('should respond with 404 status code when  user does not exist', async () => {
    const response = await request(app).get("/contacts/8/favorites");
    expect(response.status).toBe(404);
  });

  it('should respond with 200 status code when  user  exist but have not favorites contacts', async () => {
    const response = await request(app).get("/contacts/2/favorites");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Favorite list is empty");
  });


});

describe("GET/contacts/:userId/deleted",()=>{
  it('should respond with 200 status code when list deleted contacts ordered by name', async () => {
    await request(app).delete("/contacts/1");
    await request(app).delete("/contacts/2")
    const response = await request(app).get("/contacts/1/deleted");
    expect(response.status).toBe(200);
    expect(response.body[0].name).toBe("Alice")
    expect(response.body[1].name).toBe("Jhon")

  });

  it('should respond with 404 status code when  user does not exist', async () => {
    const response = await request(app).get("/contacts/8/deleted");
    expect(response.status).toBe(404);
  });

  it('should respond with 200 status code when  user  exist but have not contacts deleted', async () => {
    const response = await request(app).get("/contacts/2/deleted");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("There are no deleted contacts");
  });

})