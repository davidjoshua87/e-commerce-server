const router = require('express').Router();
const {
  itemReadAll,
  itemCreate,
  itemUpdate,
  itemDelete
} = require('../controllers/item.controller');
const {
  isAdmin
} = require('../middlewares/auth');
const {
  sendUploadToGCS,
  multer
} = require('../middlewares/upload')

router.get('/', itemReadAll);
router.post('/img', isAdmin, multer.single('image'), sendUploadToGCS, itemCreate);
router.put('/:itemId', isAdmin, itemUpdate);
router.delete('/:itemId', isAdmin, itemDelete);

module.exports = router;
