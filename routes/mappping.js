const router = require('express').Router();
const collectionRouter = require('./collections');
const collectionItemsRouter = require('./collectionItems');
const utils = require('../utils/utils');


router.all('/:model*', (req, res, next) => {
  utils.assignModelToReq(req, res, next);
});

/*
# en el caso que se quiere white or black listear algún modelo
const forbiddenModels = require('../config/forbiddenModels');
router.use('/:model', forbiddenModels); 
*/


router.use('/:model', collectionRouter);
router.use('/:model/:id', collectionItemsRouter);

module.exports = router;
