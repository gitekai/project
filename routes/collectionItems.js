const router = require('express').Router({ mergeParams: true });
const controller = require('../controller').collectionItems;

router.get('/', controller.readById);
router.put('/', controller.update);
router.delete('/', controller.delById);

module.exports = router;
