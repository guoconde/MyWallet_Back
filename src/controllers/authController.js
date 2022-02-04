import bcrypt from 'bcrypt'

import { v4 as uuid } from 'uuid'
import db from "../../db.js";
import loginSchema from '../schemas/loginSchema.js';
import signUpSchema from '../schemas/signUpSchema.js';

export async function signIn(req, res) {

    const user = req.body

    try {

        const name = await db.collection('users').findOne({ email: user.email })

        if (name && bcrypt.compareSync(user.password, name.password)) {
            setTimeout(() => {
                res.status(200).send(name)
            }, 3000)
        } else {
            res.status(401).send('Usuário ou senha inválido')
        }

    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
}


export async function signUp(req, res) {

    const user = req.body

    user.password = bcrypt.hashSync(user.password, 10)

    try {

        const name = await db.collection('users').findOne({ email: user.email })

        if (name) {
            res.status(409).send('E-mail já cadastrado')
            return
        }

        await db.collection('users').insertOne(user)
        setTimeout(() => {
            res.sendStatus(201)
        }, 3000)
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }

}