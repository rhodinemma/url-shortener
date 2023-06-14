import Router from "@koa/router"
import authRouter from "./auth";

const router = new Router();

router.use("/auth", authRouter.routes(), authRouter.allowedMethods());

router.use("/urls");

router.use("/visits")

export default router