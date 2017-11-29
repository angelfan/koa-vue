const Koa = require('koa');
const app = new Koa();
const KoaRouter = require('koa-router');
const router = new KoaRouter()
const KoaJson = require('koa-json');
const KoaLogger = require('koa-logger');
const KoaBodyParser = require('koa-bodyparser');
const jwt = require('koa-jwt');

const userRouter = require('./server/routes/user');
const apiRouter = require('./server/routes/api.js')

let current_user = {

};

app.use(KoaBodyParser());
app.use(KoaJson());
app.use(KoaLogger());

app.use(async (ctx, next) => {
  let start = new Date;
  await next();
  let ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (401 == err.status) {
      this.status = 401;
      this.body = {
        success: false,
        token: null,
        info: 'Protected resource, use Authorization header to get access'
      };
    } else {
      throw err;
    }
  }
});

app.on('error', function(err, ctx) {
  console.log('server error', err);
});

app.use(userRouter.routes());
router.use("/api", jwt({secret: 'xxxxxx', passthrough:true}), apiRouter.routes());
app.use(router.routes());


app.listen(8889, () => {
  console.log('listen on 8889');
});

module.exports = app;



