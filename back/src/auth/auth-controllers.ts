import { signInService } from "./auth-services"
import { Request, Response } from "express"

export const signInController = async (req: Request, res: Response) => {
    try {
        const {email, username, password} = req.body
        const response = await signInService(email, username, password)
        res.status(200).json(response)
    } catch (error) {
        console.log('Error when signing in:', error);
        res.status(404).json({
            message: error,
            status: 404
        })   
    }
}

export const signUpController = (req: Request, res: Response) => {
    
}