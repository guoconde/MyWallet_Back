import joi from "joi"

const inputAndOutputSchema = joi.object({
    values: joi.number().required(),
    description: joi.string().required(),
    type: joi.string().valid('input', 'output').required()
})

export default inputAndOutputSchema