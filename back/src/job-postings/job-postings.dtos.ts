import { IsNotEmpty, IsNumber, IsString, IsUUID, Length } from "class-validator";

export class CreateJobPostingDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string

    @IsNotEmpty()
    @IsString()
    @Length(50)
    title: string

    @IsNotEmpty()
    @IsString()
    @Length(800)
    description: string

    @IsNotEmpty()
    @IsNumber()
    budget: number
}