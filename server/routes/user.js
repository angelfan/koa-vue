const user = require('../controllers/user.js');
const router = require('koa-router')();

router.post('/users', user.Create);
router.get('/users/:id', user.Show);
router.post('/users/auth', user.Auth);

module.exports = router;
