const express = require('express');
const router = express.Router();
const controller = require('../controller').razonesSociales;

router.post('/', controller.create);
router.get('/', controller.readAll);
router.delete('/', controller.delAll);

router.get('/:id', controller.readById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delById);

module.exports = router;
