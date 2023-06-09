import 'dotenv/config'
import { onDatabaseConnect } from "./config/knex";

onDatabaseConnect().then(() => console.log('Database is connected')).catch((e) => {
    console.log('Error with database connection');
    console.log(e);
})