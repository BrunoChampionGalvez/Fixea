import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto, RegisterSuperAdminDto, RegisterUserDto, RegisterWorkerDto } from "./auth.dtos";
import * as bcrypt from 'bcrypt'
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { Roles } from "./roles.enum";
import { Worker } from "src/workers/workers.entity";
import { SuperAdmin } from "src/super-admins/super-admins.entity";

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>,
        @InjectRepository(Worker) private readonly workersRepository: Repository<Worker>,
        @InjectRepository(SuperAdmin) private readonly superAdminsRepository: Repository<SuperAdmin>,
        private readonly jwtService: JwtService) { }

    async loginUser(loginData: LoginDto) {
        let user: User;
        let worker: Worker;
        let superAdmin: SuperAdmin;

        if (loginData.email) {
            user = await this.usersRepository.findOneBy({ email: loginData.email });
            worker = await this.workersRepository.findOneBy({ email: loginData.email })
            superAdmin = await this.superAdminsRepository.findOneBy({ email: loginData.email })
        }

        if (!user && !worker && !superAdmin && loginData.username) {
            user = await this.usersRepository.findOneBy({ username: loginData.username });
            worker = await this.workersRepository.findOneBy({ username: loginData.username });
            superAdmin = await this.superAdminsRepository.findOneBy({ username: loginData.username });
        }

        if (user) {
            const validPassword = bcrypt.compare(loginData.password, user.password)
            if (!validPassword) throw new UnauthorizedException('Credenciales incorrectas.')
            const payload = {
                sub: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
            const now = new Date()
            await this.usersRepository.update({ id: user.id }, { lastLogin: now })
            return {
                token: await this.jwtService.signAsync(payload)
            }
        }

        if (worker) {
            const validPassword = bcrypt.compare(loginData.password, worker.password)
            if (!validPassword) throw new UnauthorizedException('Credenciales incorrectas.')
            const payload = {
                sub: worker.id,
                username: worker.username,
                email: worker.email,
                role: worker.role
            }
            const now = new Date()
            await this.workersRepository.update({ id: worker.id }, { lastLogin: now })
            return {
                token: await this.jwtService.signAsync(payload)
            }
        }

        if (superAdmin) {
            const validPassword = bcrypt.compare(loginData.password, superAdmin.password)
            if (!validPassword) throw new UnauthorizedException('Credenciales incorrectas.')
            const payload = {
                sub: superAdmin.id,
                username: superAdmin.username,
                email: superAdmin.email,
                role: superAdmin.role
            }
            const now = new Date()
            await this.superAdminsRepository.update({ id: superAdmin.id }, { lastLogin: now })
            return {
                token: await this.jwtService.signAsync(payload)
            }
        }
    }

    async registerUser(registerData: RegisterUserDto) {
        if (registerData.username) {
            const foundUsername = await this.usersRepository.findOneBy({ username: registerData.username })
            if (foundUsername) throw new BadRequestException('Username already in use.')
            const hashedPassword = bcrypt.hash(registerData.password, 10)
            const createdUser = this.usersRepository.create({ password: hashedPassword, ...registerData })
            let { password, ...userNoPassword } = await this.usersRepository.save(createdUser)
            return userNoPassword
        }
        if (registerData.email) {
            const foundEmail = await this.usersRepository.findOneBy({ email: registerData.email })
            if (foundEmail) throw new BadRequestException('Email already in use.')
            const hashedPassword = bcrypt.hash(registerData.password, 10)
            const createdUser = this.usersRepository.create({ password: hashedPassword, ...registerData })
            let { password, ...userNoPassword } = await this.usersRepository.save(createdUser)
            return userNoPassword
        }

        if (!registerData.username && !registerData.email) throw new BadRequestException('Email o username requeridos.')
    }

    async registerWorker(registerData: RegisterWorkerDto) {
        if (registerData.username) {
            const foundUsername = await this.workersRepository.findOneBy({ username: registerData.username })
            if (foundUsername) throw new BadRequestException('Username already in use.')
            const hashedPassword = bcrypt.hash(registerData.password, 10)
            const role = Roles.Worker
            const createdWorker = this.workersRepository.create({ password: hashedPassword, role: role, ...registerData })
            let { password, ...workerNoPassword } = await this.workersRepository.save(createdWorker)
            return workerNoPassword
        }
        if (registerData.email) {
            const foundEmail = await this.workersRepository.findOneBy({ email: registerData.email })
            if (foundEmail) throw new BadRequestException('Email already in use.')
            const hashedPassword = bcrypt.hash(registerData.password, 10)
            const role = Roles.Worker
            const createdWorker = this.workersRepository.create({ password: hashedPassword, role: role, ...registerData })
            let { password, ...workerNoPassword } = await this.workersRepository.save(createdWorker)
            return workerNoPassword
        }
    }

    async registerSuperAdmin(registerData: RegisterSuperAdminDto) {
        if (registerData.username) {
            const foundUsername = await this.superAdminsRepository.findOneBy({ username: registerData.username })
            if (foundUsername) throw new BadRequestException('Username already in use.')
            const hashedPassword = bcrypt.hash(registerData.password, 10)
            const role = Roles.SuperAdmin
            const createdSuperAdmin = this.superAdminsRepository.create({ password: hashedPassword, role: role, ...registerData })
            let { password, ...superAdminNoPassword } = await this.superAdminsRepository.save(createdSuperAdmin)
            return superAdminNoPassword
        }
        if (registerData.email) {
            const foundEmail = await this.superAdminsRepository.findOneBy({ email: registerData.email })
            if (foundEmail) throw new BadRequestException('Email already in use.')
            const hashedPassword = bcrypt.hash(registerData.password, 10)
            const role = Roles.SuperAdmin
            const createdSuperAdmin = this.superAdminsRepository.create({ password: hashedPassword, role: role, ...registerData })
            let { password, ...superAdminNoPassword } = await this.superAdminsRepository.save(createdSuperAdmin)
            return superAdminNoPassword
        }
    }
}