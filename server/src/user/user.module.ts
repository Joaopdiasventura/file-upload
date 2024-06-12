import { PrismaService } from "src/database/prisma.service";
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
	controllers: [UserController],
	providers: [UserService, PrismaService],
})
export class UserModule {}
