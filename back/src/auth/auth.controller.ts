import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto, RegisterSuperAdminDto, RegisterUserDto, RegisterWorkerDto } from "./auth.dtos";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    loginUser(@Body() loginData: LoginDto) {
        return this.authService.loginUser(loginData)
    }

    @Post('register/user')
    registerUser(@Body() registerData: RegisterUserDto) {
        return this.authService.registerUser(registerData)
    }

    @Post('register/worker')
    registerLeader(@Body() registerData: RegisterWorkerDto) {
        return this.authService.registerWorker(registerData)
    }

    @Post('register/superadmin')
    registerSuperAdmin(@Body() registerData: RegisterSuperAdminDto) {
        return this.authService.registerSuperAdmin(registerData)
    }
}