const express = require('express');
const router = express.Router();
const controller = require('../controller').gruposEmpresariales;

router.post('/', controller.create);
router.get('/', controller.read);
router.put('/:id', controller.update);
router.delete('/:id', controller.del);

module.exports = router;
