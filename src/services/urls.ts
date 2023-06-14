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

    return results[0];
}

export const resolveURL = async (id: string) => {
    const foundUrl = await knex("urls").where({ id }).select(["url"]).first();

    if (!foundUrl) {
        throw new Error("The ID is not valid")
    }

    return foundUrl.url;
}

export const updateURL = async (id: string, body: { url: string }, user_id: number) => {
    if (!body.url) {
        throw new Error("URL is required")
    }

    const foundUserUrl = await knex("urls").where({ id }).select(["user_id"]).first();

    if (!foundUserUrl) {
        throw new Error("URL is not found")
    }

    if (foundUserUrl.user_id !== user_id) {
        throw new Error("You don't have permissions to update this URL")
    }

    const results = await knex("urls").where({ id }).update({ url: body.url }, "*")

    return results[0]
}

export const deleteURL = async (id: string, user_id: number) => {
    const foundUserUrl = await knex("urls").where({ id }).select(["user_id"]).first();

    if (!foundUserUrl) {
        throw new Error("URL is not found")
    }

    if (foundUserUrl.user_id !== user_id) {
        throw new Error("You don't have permissions to delete this URL")
    }

    await knex("urls").where({ id }).delete();
    return true;
}

export const getURLS = async (user_id: number, limit: number, offset: number) => {
    const results = await knex("urls").where({ user_id }).limit(limit || 15).offset(offset || 0);
    return results;
}