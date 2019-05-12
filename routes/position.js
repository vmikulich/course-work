const express = require('express');
const controller = require('../controllers/position');
const upload = require('../middleware/upload');
const router = express.Router();

router.get('/:categoryId', controller.getByCategoryId);
router.post('/', upload.single('image'), controller.create);
router.patch('/:id', upload.single('image'), controller.update);
router.delete('/:id', controller.remove);

module.exports = router;