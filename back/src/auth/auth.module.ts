import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";
import { Worker } from "src/workers/workers.entity";
import { SuperAdmin } from "src/super-admins/super-admins.entity";

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '30d' },
        }),
        TypeOrmModule.forFeature([User, Worker, SuperAdmin])
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}