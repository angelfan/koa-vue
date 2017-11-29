const db = require('../models/index');

const Index = async (ctx) => {
  console.log(ctx.state)
  const userId = ctx.state.user.id;
  const user = await db.User.findById(userId);
  const Lists = await user.getLists();
  ctx.body = Lists;
};

const Create = async (ctx) => {
  const data = ctx.request.body;
  const userId = ctx.state.user.id;
  const list = await db.List.create({ user_id: userId, content: data.content, status: data.status });
  ctx.body = list.dataValues;
};

const Destroy = async (ctx) => {
  const data = ctx.request.body;
  const userId = ctx.state.user.id;
  const list = await db.List.findOne({ user_id: userId, id: data.id });
  await list.destroy();
  ctx.body = 'success';
};

const Toggle = async (ctx) => {
  const data = ctx.request.body;
  const userId = ctx.state.user.id;
  const list = await db.List.findOne({ user_id: userId, id: data.id });
  list.status = !list.status;
  await list.save();
  ctx.body = 'success';
};


module.exports = {
  Index,
  Create,
  Destroy,
  Toggle,
};
