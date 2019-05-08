const express = require("express");
const rotaAluno = require("./src/routes/alunos");
const rotaCurso = require("./src/routes/cursos");
const bodyParser = require('body-parser');
require('./src/config/database');

const app = express();

app.use(bodyParser.json());

app.use("/alunos", rotaAluno);
app.use("/cursos", rotaCurso);

app.get("/", (req, res) => res.status(200).json({ message: 'Bem vindo a escola' }));

module.exports = app;
