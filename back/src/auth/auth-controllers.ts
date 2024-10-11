import { signInService } from "./auth-services"
import { Request, Response } from "express"

export const signInController = (req: Request, res: Response) => {
    const response = signInService()
    res.send(response)
}

export const signUpController = (req: Request, res: Response) => {
    
}