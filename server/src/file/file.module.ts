import { Module } from "@nestjs/common";
import { FileService } from "./file.service";
import { FileController } from "./file.controller";
import { UserService } from "src/user/user.service";
import { PrismaService } from "src/database/prisma.service";

@Module({
	controllers: [FileController],
	providers: [FileService, UserService, PrismaService],
})
export class FileModule {}
