const router = require('express').Router();
const cursoController = require('../controllers/curso');
const validateId = require('../middlewares/validateId');

router.get('/', cursoController.findAll);

router.get('/:nome', cursoController.findByName);

router.post('/', cursoController.create);

router.put('/:_id', validateId, cursoController.update);

router.delete('/:_id', validateId, cursoController.deleteById)

module.exports = router;
