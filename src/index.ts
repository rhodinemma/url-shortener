import 'dotenv/config'
import Validator from 'validatorjs';
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

        let validation = new Validator(
            {
                id: 'ASF',
                url: "com"
            },
            {
                id: "string|min:5|max:10",
                url: "url|required"
            }
        )

        if (validation.fails()) {
            const errors = validation.errors.all();
            const aggregatedErrors: string[] = [];
            Object.keys(errors).forEach((key) => {
                aggregatedErrors.push(validation.errors.first(key) as string)
            })
            // console.log(aggregatedErrors.join(' , '))
            throw new Error(aggregatedErrors.join(' , '))
        } else {
            console.log("Validator passed")
        }
    } catch (e) {
        console.log(e)
    }
}

main();

