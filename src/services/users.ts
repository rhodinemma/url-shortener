import knex from "../config/knex";
import httpError from "http-errors"
import { validateLogin, validateRegister } from "./validations";
import { comparePassword, hashPassword } from "../config/encryption";
import { generateToken } from "../config/jwt";

const getUser = async (username: string) => knex("users").whereRaw(`LOWER(username) = LOWER(?)`, [username]).first();

export const register = async (body: { username: string; password: string }) => {
    validateRegister(body)

    const currentUser = await getUser(body.username)

    if (currentUser) {
        throw new httpError.Conflict("Username already exists")
    }

    const user = (await knex("users").insert({ username: body.username.toLowerCase(), password: await hashPassword(body.password) }, ["id", "username"]))[0];

    return user;
}

export const login = async (body: { username: string; password: string }) => {
    validateLogin(body)

    const existingUser = await getUser(body.username)

    if (!existingUser) {
        throw new httpError.Unauthorized("Username or password are incorrect")
    }

    const passwordMatch = await comparePassword(body.password, existingUser.password)

    if (!passwordMatch) {
        throw new httpError.Unauthorized("Invalid credentials")
    }

    const token = await generateToken({ id: existingUser.id })

    return { existingUser: { id: existingUser.id, username: existingUser.username, created_at: existingUser.created_at, updated_at: existingUser.updated_at }, token };
}