import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class LoginDto {
    @IsOptional()
    @IsString()
    email: string
    
    @IsOptional()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    password: string
}

export class RegisterUserDto {
    @IsOptional()
    @IsEmail()
    email: string

    @IsOptional()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string

    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsNotEmpty()
    @IsString()
    lastName: string

    @IsNotEmpty()
    @IsString()
    country: string

    @IsNotEmpty()
    @IsString()
    city: string
}

export class RegisterWorkerDto {
    @IsOptional()
    @IsEmail()
    email: string

    @IsOptional()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string

    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsNotEmpty()
    @IsString()
    lastName: string

    @IsNotEmpty()
    @IsString()
    country: string

    @IsNotEmpty()
    @IsString()
    city: string
}

export class RegisterSuperAdminDto {
    @IsOptional()
    @IsEmail()
    email: string

    @IsOptional()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string

    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsNotEmpty()
    @IsString()
    lastName: string
}