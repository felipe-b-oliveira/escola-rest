const mongoose = require('mongoose');

module.exports = (req, res, next) => {
  const body = req.body;

  if (!body.nome)
    return res.status(400).json({ message: 'Campo nome é necessário' });
  if (!body.dataNascimento)
    return res.status(400).json({ message: 'Campo dataNascimento é necessário'});
  if (!body.matriculaAtiva)
    return res.status(400).json({ message: 'Campo matriculaAtiva é necessário'});
  if (!body.estadoCivil)
    return res.status(400).json({ message: 'Campo estadoCivil é necessário'});
  if (!body.matricula)
    return res.status(400).json({ message: 'Campo matricula é necessário'});
  if (!body.telefone)
    return res.status(400).json({ message: 'Campo telefone é necessário'});
  if (!body.idade)
    return res.status(400).json({ message: 'Campo idade é necessário'});
  if (!body.cursoId)
    return res.status(400).json({ message: 'Campo cursoId é necessário'});
  if (!mongoose.Types.ObjectId.isValid(body.cursoId))
    return res.status(400).json({ message: 'cursoId é inválido' });

  return next();
};
