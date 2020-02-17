'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/post-controller');

//There is not get all posts in that API
//router.get('/', controller.list);
router.get('/:id', controller.get);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;
