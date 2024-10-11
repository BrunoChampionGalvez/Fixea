import { signInController } from "./auth-controllers"
import { router } from "../index-router"
import { Router } from "express"

export const authRouter = Router()

authRouter.post('/auth', signInController)