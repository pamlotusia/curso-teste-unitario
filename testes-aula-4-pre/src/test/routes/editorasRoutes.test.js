import { afterEach } from "@jest/globals";
import app from "../../app.js";
import request from "supertest";

let server;
beforeEach(() => {
  const port = 3001;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe("GET em /editoras", () => {
  it("Deve retornar uma lista de editoras", async () => {
    const response = await request(app)
      .get("/editoras")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body[0].email).toBe("e@e.com");
  });
});

let idResponse;
describe("POST em /editoras", () => {
  it("deve adicionar uma nova editora", async () => {
    const response = await request(app)
      .post("/editoras")
      .send({
        nome: "Editora Teste",
        cidade: "Cidade Teste",
        email: "teste@e.com",
      })
      .expect(201);
    idResponse = response.body.content.id;
  });
});

describe("DELETE em /editoras/:id", () => {
  it("deve deletar o recurso adicionado", async () => {
    await request(app).delete(`/editoras/${idResponse}`).expect(200);
  });
});
