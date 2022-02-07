import db from "../../db.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { stripHtml } from "string-strip-html";

export async function getUser(req, res) {

    const { user } = res.locals
    delete user.password

    try {
        const wallet = await db.collection('wallet').find({ id: user._id }).toArray()
        res.send({ user, wallet })

    } catch (error) {
        res.sendStatus(error)
    }
}

export async function postInputAndOutput(req, res) {

    const { user } = res.locals
    const entry = req.body

    entry.type = stripHtml(entry.type).result.trim();
    entry.description = stripHtml(entry.description).result.trim();

    try {
        await db.collection('wallet').insertOne({ ...entry, date: dayjs().format('DD/MM'), id: user._id })
        setTimeout(() => {
            res.sendStatus(200)
        }, 1500)

    } catch (error) {
        res.sendStatus(error)
    }
}

export async function deleteItem(req, res) {

    const { id } = req.params

    try {
        await db.collection('wallet').deleteOne({ _id: new ObjectId(id) })
        res.sendStatus(200);

    } catch (error) {
        res.sendStatus(error)
    }
}

export async function updateItem(req, res) {

    const entry = req.body
    const { id } = req.params

    entry.type = stripHtml(entry.type).result.trim();
    entry.description = stripHtml(entry.description).result.trim();

    try {
        await db.collection('wallet').updateOne({ _id: new ObjectId(id) }, { $set: { ...entry } })
        setTimeout(() => {
            res.sendStatus(200);
        }, 1500)

    } catch (error) {
        res.sendStatus(error)
    }
}