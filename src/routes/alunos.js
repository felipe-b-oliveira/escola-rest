const router = require('express').Router();
const alunoController = require('../controllers/alunos');
const validateId = require('../middlewares/validateId');
const validateAlunoBody = require('../middlewares/validateAlunoBody');

router.get('/', alunoController.findAll);

router.get('/:_id', validateId, alunoController.findById);

router.post('/', validateAlunoBody, alunoController.create);

router.put('/:_id', validateId, validateAlunoBody, alunoController.update);

router.delete('/:_id', validateId, alunoController.deleteById);

module.exports = router;
