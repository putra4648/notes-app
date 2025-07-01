import Koa from "koa";
import koaBody from "koa-body";
import helmet from "koa-helmet";
import router from "./routes";

const app = new Koa();

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
