const router = require('express').Router();
const {categoryCreate, categoryReadAll} = require('../controllers/category.controller');

router.get('/', categoryReadAll);
router.post('/', categoryCreate)

module.exports = router;