import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto, RegisterDto } from "./auth.dtos";
import * as bcrypt from 'bcrypt'
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { Roles } from "./roles.enum";

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService) { }

    async loginUser(loginData: LoginDto) {
        let user: User;

        if (loginData.email) {
            user = await this.usersRepository.findOneBy({ email: loginData.email });
        }

        if (!user && loginData.username) {
            user = await this.usersRepository.findOneBy({ username: loginData.username });
        }
        
        if (!user) throw new UnauthorizedException('Credenciales incorrectas.')
        
        const validPassword = bcrypt.compare(loginData.password, user.password)
        if (!validPassword) throw new UnauthorizedException('Credenciales incorrectas.')
        const payload = {
            sub: user.id,
            username: user.username,
            email: user.email,
            roles: user.roles
        }
        const now = new Date()
        await this.usersRepository.update({id: user.id}, {lastLogin: now})
        return {
            token: await this.jwtService.signAsync(payload)
        }
    }

    async registerUser(registerData: RegisterDto) {
        let foundUsername = await this.usersRepository.findOneBy({ username: registerData.username })
        if (foundUsername) throw new BadRequestException('Username already in use.')
        const foundEmail = await this.usersRepository.findOneBy({ email: registerData.email })
        if (foundEmail) throw new BadRequestException('Email already in use.')

        const hashedPassword = bcrypt.hash(registerData.password, 10)
        const createdUser = this.usersRepository.create({ password: hashedPassword, ...registerData })
        let { password, ...userNoPassword } = await this.usersRepository.save(createdUser)
        return userNoPassword
    }

    async registerLeader(registerData: RegisterDto) {
        let foundUsername = await this.usersRepository.findOneBy({ username: registerData.username })
        if (foundUsername) throw new BadRequestException('Username already in use.')
        const foundEmail = await this.usersRepository.findOneBy({ email: registerData.email })
        if (foundEmail) throw new BadRequestException('Email already in use.')

        const hashedPassword = bcrypt.hash(registerData.password, 10)
        const roles = [Roles.User, Roles.Leader]
        const createdLeader = this.usersRepository.create({ password: hashedPassword, roles: roles, ...registerData })
        let { password, ...leaderNoPassword } = await this.usersRepository.save(createdLeader)
        return leaderNoPassword
    }

    async registerSuperAdmin(registerData: RegisterDto) {
        let foundUsername = await this.usersRepository.findOneBy({ username: registerData.username })
        if (foundUsername) throw new BadRequestException('Username already in use.')
        const foundEmail = await this.usersRepository.findOneBy({ email: registerData.email })
        if (foundEmail) throw new BadRequestException('Email already in use.')

        const hashedPassword = bcrypt.hash(registerData.password, 10)
        const roles = [Roles.User, Roles.Leader, Roles.SuperAdmin]
        const createdSuperAdmin = this.usersRepository.create({ password: hashedPassword, roles: roles, ...registerData })
        let { password, ...superAdminNoPassword } = await this.usersRepository.save(createdSuperAdmin)
        return superAdminNoPassword
    }
}