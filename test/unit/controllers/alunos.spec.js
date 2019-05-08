const alunoController = require('../../../src/controllers/alunos');
const alunoService = require('../../../src/services/alunos');

jest.mock('../../../src/services/alunos');

describe('AlunoController', () => {
  let reqMock;
  let resMock;

  beforeEach(() => {
    reqMock = {
      params: {
        _id: '1'
      }
    };

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

  it('given: lista de alunos não está vazia; ' +
    'when: findAll(); ' +
    'then: retorna lista de alunos', async() => {
      alunoService.findAll.mockResolvedValue([1, 2, 3]);

      const result = await alunoController.findAll(reqMock, resMock);
      expect(result).toStrictEqual([1, 2, 3]);
  });

  it('given: lista de alunos está vazia; ' +
    'when: findAll(); ' +
    'then: retorna mensagem de aluno não encontrado', async() => {
      alunoService.findAll.mockResolvedValue([]);

      const result = await alunoController.findAll(reqMock, resMock);
      expect(result).toStrictEqual({ message: 'Nenhum aluno foi encontrado' });
  });

  it('given: aluno encontrado; ' +
    'when: findById(); ' +
    'then: retorna aluno', async() => {
      alunoService.findById.mockResolvedValue({ nome: 'test' });

      const result = await alunoController.findById(reqMock, resMock);
      expect(result).toStrictEqual({ nome: 'test' });
  });

  it('given: aluno não encontrado; ' +
    'when: findById(); ' +
    'then: retorna mensagem de aluno não encontrado', async() => {
      alunoService.findById.mockResolvedValue(null);

      const result = await alunoController.findById(reqMock, resMock);
      expect(result).toStrictEqual({ message: 'Aluno não encontrado' });
  });

  it('given: aluno criado com sucesso; ' +
    'when: create(); ' +
    'then: retorna aluno criado', async() => {
      alunoService.create.mockResolvedValue({ nome: 'test' });

      const result = await alunoController.create(reqMock, resMock);
      expect(result).toStrictEqual({ nome: 'test' });
  });

  it('given: aluno removido com sucesso; ' +
    'when: create(); ' +
    'then: retorna mensagem de remoção com sucesso', async() => {
      alunoService.deleteById.mockResolvedValue();

      const result = await alunoController.deleteById(reqMock, resMock);
      expect(result).toStrictEqual({ message: 'Aluno removido' });
  });
});
