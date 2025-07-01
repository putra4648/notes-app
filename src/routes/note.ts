import Router from "@koa/router";
import { koaBody } from "koa-body";
import NoteInterface from "../interfaces/NoteInterface";
import schema from "../validation/NoteValidation";

const noteRouter = new Router();

const container: NoteInterface[] = [];

noteRouter.get("/notes", async (ctx, next) => {
  await next();
  ctx.body = container;
});

noteRouter.post("/notes", koaBody(), async (ctx, next) => {
  await next();
  try {
    const value = await schema.validateAsync(ctx.request.body);
    console.log(value);
  } catch (error) {
    ctx.throw(400, String(error), ctx.request.body);
  }
});

export default noteRouter;
