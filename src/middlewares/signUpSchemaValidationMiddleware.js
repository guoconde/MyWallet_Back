import signUpSchema from "../schemas/signUpSchema.js";

export default function signUpSchemaValidationMiddleware(req, res, next) {
    const user = req.body
    
    const validation = signUpSchema.validate(user)

    if (validation.error) {
        res.sendStatus(422)
        return
    }

    next()
}