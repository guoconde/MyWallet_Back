import db from "../../db.js";
import dayjs from "dayjs";

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

    await db.collection('wallet').insertOne({...entry, date: dayjs().format('DD/MM'), id: user._id})
    res.sendStatus(200)
}