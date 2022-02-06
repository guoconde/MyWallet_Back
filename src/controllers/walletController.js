import db from "../../db.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

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

    try {
        await db.collection('wallet').insertOne({ ...entry, date: dayjs().format('DD/MM'), id: user._id })
        res.sendStatus(200)

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
    
    console.log(entry)

    await db.collection('users').updateOne({
      _id: new ObjectId(id)
    }, {
      $set: entry
    })
  
    res.sendStatus(200);
  }