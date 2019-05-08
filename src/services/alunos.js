const mongoose = require('mongoose');
const Aluno = require('../models/Aluno');

async function findAll() {
  return await Aluno
    .find()
    .select('_id nome dataNascimento matriculaAtiva estadoCivil matricula telefone idade');
}

async function findById(_id) {
  return await Aluno
    .findOne({ _id })
    .select('_id nome dataNascimento matriculaAtiva estadoCivil matricula telefone idade')
    .populate('curso', '_id nome');
}

async function create(aluno) {
  return await Aluno.create({
      _id: mongoose.Types.ObjectId(),
      nome: aluno.nome,
      dataNascimento: aluno.dataNascimento,
      matriculaAtiva: aluno.matriculaAtiva,
      estadoCivil: aluno.estadoCivil,
      matricula: aluno.matricula,
      telefone: aluno.telefone,
      idade: aluno.idade,
      curso: aluno.cursoId
  });
}

async function deleteById(_id) {
  await Aluno.deleteOne({ _id });
}

async function update({ _id, aluno }) {
  await Aluno.updateOne({ _id }, aluno);
}

module.exports = {
  findAll,
  findById,
  create,
  deleteById,
  update
};
