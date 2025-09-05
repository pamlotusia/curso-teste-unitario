import { afterEach, jest } from '@jest/globals';
import app from '../../app.js';
import request from 'supertest';

let server;
beforeEach(() => {
  const port = 3001;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('GET em /editoras', () => {
  it('Deve retornar uma lista de editoras', async () => {
    const response = await request(app)
      .get('/editoras')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body[0].email).toBe('e@e.com');
  });
});

let idResponse;
describe('POST em /editoras', () => {
  it('deve adicionar uma nova editora', async () => {
    const response = await request(app)
      .post('/editoras')
      .send({
        nome: 'Editora Teste',
        cidade: 'Cidade Teste',
        email: 'teste@e.com',
      })
      .expect(201);
    idResponse = response.body.content.id;
  });

  it('deve não adicionar nada ao passar o body vazio', async () => {
    await request(app).post('/editoras').send({}).expect(400);
  });
});

describe("PUT em '/editoras:id'", () => {
  test.each([
    ['nome', { nome: 'Item 1' }],
    ['cidade', { cidade: 'cidade 1' }],
    ['email', { email: 'email' }],
  ])('deve alterar o campo %s', async (param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');
    await requisicao
      .request(app)
      .put(`/editoras/${idResponse}`)
      .send(param)
      .expect(204);

    expect(spy).toHaveBeenCalled();
  });
});

describe('DELETE em /editoras/:id', () => {
  it('deve deletar o recurso adicionado', async () => {
    await request(app).delete(`/editoras/${idResponse}`).expect(200);
  });
});
