const cursoService = require('../../../src/services/curso');
const Curso = require('../../../src/models/Curso');

jest.mock('../../../src/models/Curso');

describe('CursoService', () => {
  beforeEach(() => {
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('given: modelo de Curso retorna lista de cursos; ' +
    'when: findAll(); ' +
    'then: retorna curso encontrado pelo modelo', async() => {
      const selectSpy = jest.fn().mockReturnValue([1, 2, 3]);

      Curso.find.mockReturnValue({
        select: selectSpy
      });

      const result = await cursoService.findAll();
      expect(result).toStrictEqual([1, 2, 3]);
      expect(selectSpy).toBeCalledWith('nome _id');
  });

  it('given: curso encontrado com nome passado por parametro; ' +
    'when: findByName(); ' +
    'then: retorna curso', async() => {
      const selectSpy = jest.fn().mockReturnValue({ curso: true });

      Curso.findOne.mockReturnValue({
        select: selectSpy
      });

      const result = await cursoService.findByName('nomeDoCurso');
      expect(result).toStrictEqual({ curso: true });
      expect(Curso.findOne).toBeCalledWith({ nome: 'nomeDoCurso' });
      expect(selectSpy).toBeCalledWith('nome _id');
  });

  it('given: curso encontrado com id passado por parametro; ' +
    'when: findById(); ' +
    'then: retorna curso', async() => {
      Curso.findById.mockReturnValue({ cursoWithId: true });

      const result = await cursoService.findById('1');
      expect(result).toStrictEqual({ cursoWithId: true });
      expect(Curso.findById).toBeCalledWith('1');
  });
});
