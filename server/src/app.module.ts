import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { FileModule } from "./file/file.module";

@Module({
	imports: [UserModule, FileModule],
	controllers: [],
	providers: [AppService],
})
export class AppModule {}
