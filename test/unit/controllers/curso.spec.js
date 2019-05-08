const cursoController = require('../../../src/controllers/curso');
const cursoService = require('../../../src/services/curso');

jest.mock('../../../src/services/curso');

describe('CursoController', () => {
  let reqMock;
  let resMock;

  beforeEach(() => {
    resMock = {
      status: () => ({
        json: param => param
      })
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('given: lista de cursos não está vazia' +
    'when: findAll()' +
    'then: retorna lista de cursos', async() => {
      cursoService.findAll.mockResolvedValue([1, 2, 3]);

      const result = await cursoController.findAll(reqMock, resMock);
      expect(result).toStrictEqual([1, 2, 3]);
  });

  it('given: lista de cursos está vazia' +
    'when: findAll()' +
    'then: retorna mensagem de curso não encontrado', async() => {
      cursoService.findAll.mockResolvedValue([]);

      const result = await cursoController.findAll(reqMock, resMock);
      expect(result).toStrictEqual({ message: 'Nenhum curso foi encontrado' });
  });
});
