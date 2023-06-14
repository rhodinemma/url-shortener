import Validator from 'validatorjs';
import httpError from "http-errors"

type RequestBody = { [key: string]: any }

const validateBody = (body: RequestBody, validation_schema: Validator.Rules) => {
    let validation = new Validator(
        body,
        validation_schema
    )

    if (validation.fails()) {
        const errors = validation.errors.all();
        const aggregatedErrors: string[] = [];
        Object.keys(errors).forEach((key) => {
            aggregatedErrors.push(validation.errors.first(key) as string)
        })
        // console.log(aggregatedErrors.join(' , '))
        throw new httpError.BadRequest(aggregatedErrors.join(' , '))
    } else {
        // console.log("Validator passed")
        return true;
    }
}

export const validateCreateShortURL = async (body: RequestBody) => {
    validateBody(body, {
        url: "url|required",
        id: "string|min:5|max:10"
    })
}

export const validateUpdateShortURL = async (body: RequestBody) => {
    validateBody(body, {
        url: "url|required",
    })
}