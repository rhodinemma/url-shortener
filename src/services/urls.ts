import knex from "../config/knex"

export const createShortURL = async (body: { url: string, id?: string }, user_id: number) => {
    if (!body.url) {
        throw new Error("URL is required")
    }

    if (body.id) {
        const current_record = await knex("urls").where({ id: body.id }).first();
        if (current_record) {
            throw new Error("The ID provided already exists")
        }
    }

    const results = await knex("urls").insert({ url: body.url, id: body.id, user_id }, "*");

    return results;
}

export const resolveURL = async (id: string) => {
    const foundUrl = await knex("urls").where({ id }).select(["url"]).first();

    if (!foundUrl) {
        throw new Error("The ID is not valid")
    }

    return foundUrl.url;
}