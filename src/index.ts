import 'dotenv/config'
import knex, { onDatabaseConnect } from "./config/knex";

const main = async () => {
    try {
        await onDatabaseConnect();
        console.log("Database is connected")

        //Database is ready
        // const users = await knex("users").select(['username']).first();
        // const users = await knex("users").insert({
        //     username: "test3",
        //     password: 'test'
        // }, "*")
        // console.log(users)

        // const users = await knex('users');
        // console.log(users[0].username)
    } catch (e) {
        console.log(e)
    }
}

main();

