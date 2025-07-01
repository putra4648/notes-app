import Router from "@koa/router";
import noteRouter from "./note";

const router = new Router();

router.register("/notes", ["POST", "GET", "DELETE"], noteRouter.routes());

export default router;
