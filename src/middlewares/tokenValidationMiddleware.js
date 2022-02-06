import db from "../../db.js";

export async function tokenValidationMiddleware(req, res, next) {

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '')

    if (!token) {
        console.log('1')
        return res.sendStatus(401)
    }
    
    const session = await db.collection('sessions').findOne({ token });
    if (!session) {
        console.log('2')
        return res.sendStatus(401)
    }
    
    const user = await db.collection('users').findOne({ _id: session.userId });
    if (!user) {
        console.log('3')
        return res.sendStatus(401);
    }
    
    res.locals.user = user;

    next();
}