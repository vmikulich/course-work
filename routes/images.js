const express = require('express');
const controller = require('../controllers/category');
const upload = require('../middleware/upload');
const router = express.Router();

router.get('/',  controller.getAll);
router.get('/:id', controller.getById);
router.delete('/:id', controller.remove);
router.post('/', upload.single('image'), controller.create);
router.patch('/:id', upload.single('image'), controller.update);

//router.get('/')

module.exports = router;