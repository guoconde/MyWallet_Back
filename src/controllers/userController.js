// import db from "../../db";

export async function getUser(req, res) {

    const { user } = res.locals

    delete user.password

    res.send(user)
}