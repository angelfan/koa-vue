const Koa = require('koa');
const app = new Koa();
const KoaRouter = require('koa-router');
const router = new KoaRouter()
const KoaJson = require('koa-json');
const KoaLogger = require('koa-logger');
const KoaBodyParser = require('koa-bodyparser');

const userRouter = require('./server/routes/user');

app.use(KoaBodyParser());
app.use(KoaJson());
app.use(KoaLogger());


app.use(async (ctx, next) => {
  let start = new Date;
  await next();
  let ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.on('error', function(err, ctx) {
  console.log('server error', err);
});

app.use(userRouter.routes());
app.use(router.routes());

app.listen(8889, () => {
  console.log('listen on 8889');
});

module.exports = app;



