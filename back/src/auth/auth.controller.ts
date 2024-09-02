import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto, RegisterDto } from "./auth.dtos";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    loginUser(@Body() loginData: LoginDto) {
        return this.authService.loginUser(loginData)
    }

    @Post('register/user')
    registerUser(@Body() registerData: RegisterDto) {
        return this.authService.registerUser(registerData)
    }

    @Post('register/leader')
    registerLeader(@Body() registerData: RegisterDto) {
        return this.authService.registerLeader(registerData)
    }

    @Post('register/superadmin')
    registerSuperAdmin(@Body() registerData: RegisterDto) {
        return this.authService.registerSuperAdmin(registerData)
    }
}