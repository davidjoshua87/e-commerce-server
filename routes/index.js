const express = require('express');
const router = express.Router();
const {
  login,
  verifyAdmin
} = require('../controllers');
const {
  isAdmin
} = require('../middlewares/auth')

router.post('/login', login);
router.get('/verifyAdmin', verifyAdmin)
router.get('/', (req, res)=>{
  res.send('berhasil')
})
module.exports = router;
