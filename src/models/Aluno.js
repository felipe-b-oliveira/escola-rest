const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nome: String,
  dataNascimento: String,
  matriculaAtiva: String,
  estadoCivil: String,
  matricula: String,
  telefone: Array,
  idade: String,
  curso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Curso'
  }
});

const Aluno = mongoose.model('Aluno', alunoSchema);

module.exports = Aluno;
