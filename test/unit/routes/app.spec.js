const request = require('supertest');
const server = require('../../../bin/www');

describe('App', () => {
  afterEach(() => {
    server.close();
  });

  it('given: request acontece com sucesso' +
    'when: GET /' +
    'then: retorna mensagem de bem vindo com status 200', async() => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.body).toHaveProperty('message', 'Bem vindo a escola');
  });
});
