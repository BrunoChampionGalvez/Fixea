import {config as dotenvConfig} from 'dotenv'

dotenvConfig({path: '.development.env'})

export const jwtConstants = {
    secret: process.env.JWT_SECRET,
};