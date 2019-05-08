const alunoService = require('../services/alunos');

const findAll = async(req, res) => {
  const alunos = await alunoService.findAll();

  if (alunos.length <= 0) return res
      .status(404)
      .json({ message: 'Nenhum aluno foi encontrado' });

  return res.status(200).json(alunos);
}

const findById = async(req, res) => {
  const aluno = await alunoService.findById(req.params._id);

  if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });

  return res.status(200).json(aluno);
};

const create = async(req, res) => {
  const aluno = await alunoService.create(req.body);

  return res.status(201).json(aluno);
};

const update = async(req, res) => {
  const aluno = await alunoService.findById(req.params._id);

  if (aluno) {
    await alunoService.update({ _id: req.params._id, aluno: req.body });

    return res.status(201).json({ message: 'Aluno atualizado' });
  }

  const addedAluno = await alunoService.create(req.body);

  return res
    .status(201)
    .json({ message: 'Aluno adicionado', aluno: addedAluno });
};

const deleteById = async(req, res) => {
  await alunoService.deleteById(req.params._id);

  return res.status(200).json({ message: 'Aluno removido' });
};

module.exports = {
  findAll,
  findById,
  create,
  deleteById,
  update
};
