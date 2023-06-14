import jwt from "jsonwebtoken"
import httpError from "http-errors"

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY as string;

export const generateToken = async (payload: { [key: string]: any }) => jwt.sign(payload, JWT_PRIVATE_KEY, { expiresIn: "1d" })

export const validateJWT = async (token: string) => {
    try {
        const content = jwt.verify(token, JWT_PRIVATE_KEY)
        return content;
    } catch (e) {
        throw new httpError.Unauthorized("Please provide valid token")
    }
}