import Router from "@koa/router";
import { ValidationError } from "joi";
import { koaBody } from "koa-body";
import { nanoid } from "nanoid";
import Note from "../entities/Note";
import NoteInterface from "../interfaces/NoteInterface";
import schema from "../validation/NoteValidation";

const noteRouter = new Router();

noteRouter
  .get("/notes", async (ctx, next) => {
    await next();
    const notes = await Note.findAll();
    ctx.body = notes;
  })
  .post("/notes", koaBody(), async (ctx, next) => {
    await next();
    try {
      const body: NoteInterface = await schema.validateAsync(ctx.request.body);
      const note = await Note.create({
        id: nanoid(),
        name: body.name,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDone: false,
      });
      await note.save();
      ctx.body = "Success add data";
    } catch (error) {
      if (error instanceof ValidationError) {
        ctx.throw(400, error.message);
      }
    }
  });

export default noteRouter;
