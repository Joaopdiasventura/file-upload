import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe());

	const corsOptions = {
		origin: process.env.FRONTEND,
		methods: ["GET", "DELETE", "POST", "PUT"],
		allowedHeaders: ["Content-Type", "Authorization"],
	};

	app.enableCors(corsOptions);
	
	await app.listen(process.env.PORT || 3000);
}
bootstrap();
