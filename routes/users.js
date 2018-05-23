const express = require('express');
const router = express.Router();
const {userCreate, userRead, userReadAll, userUpdate, userDelete} = require('../controllers/user.controller')
const {isAdmin, authorization} = require('../middlewares/auth')

/* GET users listing. */
router.get('/', isAdmin, userReadAll);
router.post('/', userCreate);
router.get('/:userId', authorization, userRead);
router.put('/:userId', authorization, userUpdate);
router.delete('/:userId', authorization, userDelete)

module.exports = router;
