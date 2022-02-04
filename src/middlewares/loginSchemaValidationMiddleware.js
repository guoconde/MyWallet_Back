import loginSchema from "../schemas/loginSchema.js";

export default function loginSchemaValidationMiddleware(req, res, next) {
    const validation = loginSchema.validate(user)

    if (validation.error) {
        res.sendStatus(422)
        return
    }

    next()
}