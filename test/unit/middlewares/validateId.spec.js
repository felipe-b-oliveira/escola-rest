const mongoose = require('mongoose');
const validateId = require('../../../src/middlewares/validateId');

jest.mock('mongoose');

describe('ValidateID', () => {
  let reqMock;
  let resMock;
  let nextMock;

  beforeEach(() => {
    reqMock = {
      params: { _id: '1' }
    };

    resMock = {
      status: () => ({
        json: param => param
      })
    };

    nextMock = jest.fn().mockReturnValue({ nextExecuted: true });
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('given: id válido; ' +
    'when: validateId(); ' +
    'then: executa o next', () => {
    mongoose.Types.ObjectId.isValid.mockReturnValue(true);

    const result = validateId(reqMock, resMock, nextMock);
    expect(nextMock).toBeCalledTimes(1);
    expect(result).toStrictEqual({ nextExecuted: true });
  });

  it('given: id inválido; ' +
    'when: validateId(); ' +
    'then: retorna mensagem de id inválido', () => {
    mongoose.Types.ObjectId.isValid.mockReturnValue(false);

    const result = validateId(reqMock, resMock, nextMock);
    expect(result).toStrictEqual({ message: 'Id inválido' });
    expect(nextMock).not.toBeCalled();
  });
});
