const alunoService = require('../../../src/services/alunos');
const Aluno = require('../../../src/models/Aluno');
const mongoose = require('mongoose');

jest.mock('../../../src/models/Aluno');

describe('AlunoService', () => {
  beforeEach(() => {
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('given: modelo de Aluno retorna aluno; ' +
    'when: findAll(); ' +
    'then: retorna aluno encontrado pelo modelo', async() => {
      const selectSpy = jest.fn().mockReturnValue({ aluno: true });

      Aluno.find.mockReturnValue({
        select: selectSpy
      });

      const result = await alunoService.findAll();
      expect(result).toStrictEqual({ aluno: true });
      expect(selectSpy).toBeCalledWith('_id nome dataNascimento matriculaAtiva estadoCivil matricula telefone idade');
  });

  it('given: aluno encontrado com id passado por parametro; ' +
    'when: findById(); ' +
    'then: retorna aluno com curso vinculado', async() => {
      const populateSpy = jest.fn()
        .mockReturnValue({ alunoWithCourse: true });

      const selectSpy = jest.fn()
        .mockReturnValue({
          populate: populateSpy
        });

      Aluno.findOne.mockReturnValue({
        select: selectSpy
      });

      const result = await alunoService.findById('1');
      expect(result).toStrictEqual({ alunoWithCourse: true });
      expect(Aluno.findOne).toBeCalledWith({ _id: '1' });
      expect(selectSpy).toBeCalledWith('_id nome dataNascimento matriculaAtiva estadoCivil matricula telefone idade');
      expect(populateSpy).toBeCalledWith('curso', '_id nome');
  });

  it('given: aluno criado com sucesso; ' +
    'when: create(); ' +
    'then: retorna aluno crriado', async() => {
      Aluno.create.mockResolvedValue({ created: true });
      mongoose.Types.ObjectId = jest.fn().mockReturnValue('ID');

      const alunoParam = {
        nome: 'testeNome',
        dataNascimento: 'testeDataNascimento',
        matriculaAtiva: 'testeMatriculaAtiva',
        estadoCivil: 'testeEstadoCivil',
        matricula: 'testeMatricula',
        telefone: 'testeTelefone',
        idade: 'testeIdade',
        cursoId: 'testeCursoId'
      };

      const result = await alunoService.create(alunoParam);
      expect(result).toStrictEqual({ created: true });
      expect(Aluno.create).toBeCalledWith({
        _id: 'ID',
        nome: 'testeNome',
        dataNascimento: 'testeDataNascimento',
        matriculaAtiva: 'testeMatriculaAtiva',
        estadoCivil: 'testeEstadoCivil',
        matricula: 'testeMatricula',
        telefone: 'testeTelefone',
        idade: 'testeIdade',
        curso: 'testeCursoId'
      });
  });

  it('given: aluno removido com sucesso; ' +
    'when: deleteById(); ' +
    'then: não retorna nada', async() => {
      await alunoService.deleteById('1');
      expect(Aluno.deleteOne).toBeCalledWith({ _id: '1' });
  });
});
