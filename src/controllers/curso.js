const cursoService = require('../services/curso');

const findAll = async(req, res) => {
  const cursos = await cursoService.findAll();

  if (cursos.length <= 0) return res
      .status(404)
      .json({ message: 'Nenhum curso foi encontrado' });

  return res.status(200).json(cursos);
}

const findByName = async(req, res) => {
  const curso = await cursoService.findByName(req.params.nome);

  if (!curso) return res.status(404).json({ message: 'Curso não encontrado' });

  return res.status(200).json(curso);
}

const create = async(req, res) => {
  try {
    const curso = await cursoService.create(req.body);

    return res.status(201).json(curso);
  } catch (err) {
    if(err.code === 11000) return res.status(500).json({ message: 'Curso já existente' });
    return res.status(500).json({ message: 'Error' });
  }
};

const update = async(req, res) => {
  const curso = await cursoService.findById(req.params._id);

  if (curso) {
    await cursoService.updateOne({
      _id: req.params._id,
      nome: req.body.nome
    });

    return res.status(201).json({ message: 'Curso atualizado' });
  } else {
    await cursoService.create(req.body.nome);

    return res.status(201).json({ message: 'Curso adicionado' });
  }
};

const deleteById = async(req, res) => {
  try {
    await cursoService.deleteById(req.params._id);

    return res.status(200).json({ message: 'Removido com sucesso' });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno' });
  }
};

module.exports = {
  findAll,
  findByName,
  create,
  update,
  deleteById
};
