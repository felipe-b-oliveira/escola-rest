const request = require('supertest');
const server = require('../../../bin/www');
const Curso = require('../../../src/models/Curso');

jest.mock('../../../src/models/Curso');

describe('Rotas de cursos', () => {
  afterEach(() => {
    server.close();
  });

  it('given: existem cursos no database' +
    'when: GET /cursos' +
    'then: retorna lista de cursos', async() => {
    Curso.find.mockReturnValue({
      select: jest.fn().mockReturnValue([
        { _id: '1', nome: 'Sistemas' },
        { _id: '2', nome: 'Medicina' }
      ])
    });

    const response = await request(server).get('/cursos');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toStrictEqual({ _id: '1', nome: 'Sistemas' });
    expect(response.body[1]).toStrictEqual({ _id: '2', nome: 'Medicina' });
  });
});
