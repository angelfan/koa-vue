const db = require('../models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Show = async (ctx) => {
  const user = await db.User.findById(ctx.params.id);
  ctx.body = user.dataValues;
};

const Create = async (ctx) => {
  const user = await db.User.create({ user_name: 'fnord', password: 123 });
  ctx.body = user.dataValues;
};

const Auth = async (ctx) => {
  const data = ctx.request.body;
  const user = await db.User.findOne({ where: { user_name: data.name } });
  const userInfo = user.dataValues;
  if (userInfo) {
    if (!bcrypt.compareSync(data.password, userInfo.password)) {
      ctx.body = { success: false, info: '密码错误' };
    } else {
      const userToken = {
        name: userInfo.user_name,
        id: userInfo.id,
      };
      const secret = 'xxxxxx';
      const token = jwt.sign(userToken, secret);
      ctx.body = {
        success: true,
        token,
      };
    }
  } else {
    ctx.body = {
      success: false, info: '用户不存在',
    };
  }
};

module.exports = {
  Create,
  Show,
  Auth,
};
