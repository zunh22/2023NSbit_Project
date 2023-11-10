// routes/projectRouter.js
const ruleController = require('../controllers/projectController');
const {
  getAllRules,
  getRule,
  postRule,
  putRule,
} = ruleController;
const router = require('express').Router();

router.get('/', getAllRules);
router.get('/:id', getRule);
router.post('/save', postRule);
router.put('/:id', putRule);

module.exports = router;