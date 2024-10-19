import { signInController } from "./auth-controllers"
import { Router } from "express"

export const authRouter = Router()

authRouter.post('/auth', signInController)