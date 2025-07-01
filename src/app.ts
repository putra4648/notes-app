import Koa from "koa";
import koaBody from "koa-body";
import helmet from "koa-helmet";
import db from "./db";
import router from "./routes";

const app = new Koa();

db.sync({ force: true })
  .then(() => {
    app.context.database = db;
    console.log("All models were synchronized successfully.");
  })
  .catch((err) => {
    app.emit("error", err);
  });

// logger
app.use(async (ctx, next) => {
  await next();
  console.log(`${ctx.method} ${ctx.url} ${ctx.body}`);
});
app.use(router.routes()).use(router.allowedMethods());
app.use(koaBody);
app.use(helmet);

app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

app.listen({ port: 8000 }, () => {
  console.log("listening on port 3000");
});
