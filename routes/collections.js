const router = require('express').Router({ mergeParams: true });
const controller = require('../controller').collections;

router.get('/', controller.readAll);
router.post('/', controller.create);
router.delete('/', controller.delAll);

module.exports = router;
