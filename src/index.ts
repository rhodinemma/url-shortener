import 'dotenv/config'
import Koa from "koa"
import cors from '@koa/cors';
import helmet from "koa-helmet"
import bodyParser from 'koa-bodyparser';
import { onDatabaseConnect } from "./config/knex";
import { createShortURL } from './services/urls';

const app = new Koa();

app.use(cors())
app.use(helmet())
app.use(bodyParser())

app.use(async (ctx) => {
    ctx.response.body = await createShortURL(ctx.query as any, 6)
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

