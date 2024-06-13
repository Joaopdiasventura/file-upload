import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { FileModule } from "./file/file.module";

@Module({
	imports: [UserModule, FileModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
