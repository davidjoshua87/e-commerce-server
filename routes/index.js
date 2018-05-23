const express = require('express');
const router = express.Router();
const {login, verifyAdmin} = require('../controllers');
const {isAdmin} = require('../middlewares/auth')

router.post('/', login);
router.get('/verifyAdmin', verifyAdmin)

module.exports = router;
