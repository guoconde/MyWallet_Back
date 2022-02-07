import joi from "joi"

const signUpSchema = joi.object({
    name: joi.string().min(2).trim().required('Por favor adicione um nome válido'),
    email: joi.string().email().required('Por favor adicione um email válido'),
    password: joi.string().required()
})

export default signUpSchema