const express = require('express');
const router = express.Router();
const controller = require('../controller').gruposEmpresariales;

router.get('/', (req,res)=>{ res.json({message:"Hello soon deleted ge router !!!!"}); });
// router.get('/', controller.readAll);
// router.delete('/', controller.delAll);

// router.get('/:id', controller.readById);
// router.put('/:id', controller.update);
// router.delete('/:id', controller.delById);
// router.post('/:id/rs', controller.addRazonSocial);

module.exports = router;
