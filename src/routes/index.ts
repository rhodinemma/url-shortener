import Router from "@koa/router"
import authRouter from "./auth";
import urlsRouter from "./urls";
import { requireAuthHandler } from "./middlewares";

const router = new Router();

router.use("/auth", authRouter.routes(), authRouter.allowedMethods());

router.use("/urls", requireAuthHandler, urlsRouter.routes(), urlsRouter.allowedMethods());

router.use("/visits")

export default router