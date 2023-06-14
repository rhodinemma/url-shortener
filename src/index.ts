import 'dotenv/config'
import { onDatabaseConnect } from "./config/knex";
import { register } from './services/users';

const main = async () => {
    try {
        await onDatabaseConnect();
        console.log("Database is connected")
        const user = await register({ username: 'Awesome', password: '123456' })
        console.log(user)
    } catch (e) {
        console.log(e)
    }
}

main();

