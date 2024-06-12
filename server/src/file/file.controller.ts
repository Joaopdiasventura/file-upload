import {
	Res,
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from "@nestjs/common";
import { Response } from "express";
import { FileService } from "./file.service";
import { CreateFileDto } from "./dto/create-file.dto";
import { UpdateFileDto } from "./dto/update-file.dto";
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
					msg: "Você precisa estar cadastrado para realizar o login",
				});
	}

	@Get()
	findAll() {
		return this.fileService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.fileService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateFileDto: UpdateFileDto) {
		return this.fileService.update(+id, updateFileDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.fileService.remove(+id);
	}
}
