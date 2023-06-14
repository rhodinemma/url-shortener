import 'dotenv/config'
import Koa from "koa"
import { onDatabaseConnect } from "./config/knex";

const app = new Koa();

app.use(async (ctx, next) => {
    //ctx.response.body = "Hello Rhodin"
    ctx.state.user_id = 10;
    console.log('Middleware 1 finished')
    await next();
})

app.use(async (ctx, next) => {
    console.log('Middleware 2')
    console.log(ctx.state.user_id)
    ctx.response.body = ctx.state.user_id
})

const main = async () => {
    try {
        await onDatabaseConnect();
        console.log("Database is connected")

        app.listen(Number(process.env.PORT), () => {
            console.log(`Server started on port ${process.env.PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

main();

