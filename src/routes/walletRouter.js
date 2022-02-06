import { Router } from "express";
import { getUser, postInputAndOutput, deleteItem, updateItem } from "../controllers/walletController.js";
import { tokenValidationMiddleware } from "../middlewares/tokenValidationMiddleware.js";
import inputAndOutputSchemaValidationMiddleware from "../middlewares/inputAndOutputSchemaValidationMiddleware.js";

const walletRouter = Router()

walletRouter.use(tokenValidationMiddleware)
walletRouter.get('/carteira', getUser)
walletRouter.post('/entrada', inputAndOutputSchemaValidationMiddleware, postInputAndOutput)
walletRouter.post('/saida', inputAndOutputSchemaValidationMiddleware, postInputAndOutput)
walletRouter.delete('/carteira/:id', deleteItem)
walletRouter.put('/entrada/:id', updateItem)
walletRouter.put('/saida/:id', updateItem)

export default walletRouter