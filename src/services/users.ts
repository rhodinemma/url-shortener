import knex from "../config/knex";
import httpError from "http-errors"
import { validateRegister } from "./validations";

export const register = async (body: { username: string; password: string }) => {
    validateRegister(body)

    const currentUser = await knex("users").whereRaw(`LOWER(username) = LOWER(?)`, [body.username]).first();

    if (currentUser) {
        throw new httpError.Conflict("Username already exists")
    }

    const user = (await knex("users").insert({ username: body.username.toLowerCase(), password: body.password }, ["id", "username"]))[0];

    return user;
}

export const login = async (body: { username: string; password: string }) => { }