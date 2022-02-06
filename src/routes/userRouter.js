import { Router } from "express";
import { getUser, postInputAndOutput } from "../controllers/userController.js";
import { tokenValidationMiddleware } from "../middlewares/tokenValidationMiddleware.js";
import inputAndOutputSchemaValidationMiddleware from "../middlewares/inputAndOutputSchemaValidationMiddleware.js";

const userRouter = Router()

userRouter.use(tokenValidationMiddleware)
userRouter.get('/carteira', getUser)
userRouter.post('/saida', inputAndOutputSchemaValidationMiddleware, postInputAndOutput)

export default userRouter