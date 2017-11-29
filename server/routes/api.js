const todoList = require('../controllers/todoList');
const router = require('koa-router')();

router.get('/todo_lists', todoList.Index);
router.post('/todo_lists/', todoList.Create);
router.delete('/todo_lists/:id', todoList.Destroy);
router.put('/todo_lists/:id/toggle', todoList.Toggle);


module.exports = router;
