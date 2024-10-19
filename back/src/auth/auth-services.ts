import { usersRepository } from "../config/repositories"
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { config } from "dotenv"

config({path: '../../.env'})
const JWT_SECRET = process.env.JWT_SECRET as jwt.Secret

export const signInService = async (email: string, username: string, password: string) => {
    const foundUserByEmail = await usersRepository.findOneBy({email})
    const foundUserByUsername = await usersRepository.findOneBy({username})
    if (!foundUserByUsername && !foundUserByEmail) {
        throw new Error('Wrong credentials.')
    }

    const user = foundUserByEmail || foundUserByUsername
    if (user && user.password) {
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) throw new Error('Wrong credentials.')
        
        const { password: newPassword, ...userNoPassword } = user

        const token = jwt.sign({
            id: user.id,
            name: user.username
        }, JWT_SECRET, {expiresIn: '30d'})

        return {
            token
        }
    }

    throw new Error('Wrong credentials.')
}

export const signUpService = () => {
    
}