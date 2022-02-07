import bcrypt from 'bcrypt'
import db from "../../db.js";
import { v4 as uuid } from 'uuid'
import { stripHtml } from 'string-strip-html';

export async function signIn(req, res) {

    const user = req.body

    user.password = stripHtml(user.password).result;
    user.email = stripHtml(user.email).result.trim();

    try {

        const name = await db.collection('users').findOne({ email: user.email })

        if (name && bcrypt.compareSync(user.password, name.password)) {
            setTimeout(async () => {
                const token = uuid()

                await db.collection('sessions').insertOne({ token, userId: name._id })

                res.status(200).send(token)
            }, 1500)
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

    user.password = stripHtml(user.password).result;
    user.email = stripHtml(user.email).result.trim();
    user.name = stripHtml(user.name).result.trim();

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
        }, 1500)
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }

}