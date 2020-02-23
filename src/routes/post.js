'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/post-controller');

router.get('/', controller.list);
router.get('/:id', controller.get);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;
