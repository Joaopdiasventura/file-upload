import { AddUserFileDto } from "./dto/addUser-file.dto";
import { Res, Controller, Get, Post, Body, Param } from "@nestjs/common";
import { Response } from "express";
import { FileService } from "./file.service";
import { CreateFileDto } from "./dto/create-file.dto";
import { UserService } from "src/user/user.service";

@Controller("file")
export class FileController {
	constructor(
		private readonly fileService: FileService,
		private readonly userService: UserService,
	) {}

	@Post()
	async create(@Body() createFileDto: CreateFileDto, @Res() res: Response) {
		const user = await this.userService.findUser(createFileDto.user);

		return user
			? res.status(201).send(await this.fileService.create(createFileDto))
			: res.status(400).send({
					message:
						"Você precisa estar cadastrado para criar um arquivo",
				});
	}

	@Post("addUserFile")
	async addUserFile(
		@Body() addUserFileDto: AddUserFileDto,
		@Res() res: Response,
	) {
		const user = await this.userService.findUser(addUserFileDto.user);

		if (!user)
			return res.status(400).send({
				message:
					"Você precisa estar cadastrado para adicionar alguém em um arquivo",
			});

		const file = await this.fileService.findFile(addUserFileDto.file);

		if (!file)
			return res.status(400).send({ message: "Arquivo inexistente" });

		await this.fileService.addUserFile(addUserFileDto);
		return res
			.status(201)
			.send({ message: "Usuário adicionado ao arquivo com sucesso" });
	}

	@Get("/getFilesByUser/:user")
	async getFilesByUser(@Param("user") user: string, @Res() res: Response) {
		const existUser = await this.userService.findUser(user);

		if (!existUser)
			return res.status(400).send({
				message: "Você precisa estar cadastrado para realizar o login",
			});

		return res
			.status(200)
			.send(await this.fileService.getFilesByUser(user));
	}

	@Get("/getUsersByFile/:file")
	async getUsersByFile(@Param("file") file: string, @Res() res: Response) {
		const existFile = await this.fileService.findFile(file);

		if (!existFile)
			return res.status(404).send({
				message: "Aquivo não encontrado",
			});

		return res
			.status(200)
			.send(await this.fileService.getUsersByFile(file));
	}

	@Get("/getFilesByName/:user/:name")
	async getFilesByName(
		@Param("user") user: string,
		@Param("name") name: string,
		@Res() res: Response,
	) {
		const existUser = await this.userService.findUser(user);

		if (!existUser)
			return res.status(400).send({
				message: "Você precisa estar cadastrado para realizar o login",
			});

		return res
			.status(200)
			.send(await this.fileService.getFilesByName({ user, name }));
	}
}
