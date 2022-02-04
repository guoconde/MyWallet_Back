import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import loginSchemaValidationMiddleware from "../middlewares/loginSchemaValidationMiddleware.js";
import signUpSchemaValidationMiddleware from "../middlewares/signUpSchemaValidationMiddleware.js";

const authRouter = Router()

authRouter.post('/', loginSchemaValidationMiddleware, signIn)
authRouter.post('/cadastrar',signUpSchemaValidationMiddleware, signUp)

export default authRouter