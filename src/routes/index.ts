import Router from "@koa/router"

const router = new Router();

router.get("/hi", async (ctx) => {
    ctx.response.body = "Next level"
})

export default router