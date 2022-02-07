import joi from "joi"

const inputAndOutputSchema = joi.object({
    values: joi.number().positive().precision(2).required(),
    description: joi.string().required('Por favor adicione uma descrição válida'),
    type: joi.string().valid('input', 'output').required()
})

export default inputAndOutputSchema