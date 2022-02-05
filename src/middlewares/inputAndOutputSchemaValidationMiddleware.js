import inputAndOutputSchema from "../schemas/inputAndOutputSchema.js"

export default function inputAndOutputSchemaValidationMiddleware(req, res, next) {
    const user = req.body
    
    const validation = inputAndOutputSchema.validate(user)

    if (validation.error) {
        res.sendStatus(422)
        return
    }

    next()
}