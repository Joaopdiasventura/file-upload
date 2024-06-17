import { UpdateUserFileDto } from "./dto/update-userFile.dto";
import { GetFilesByUserNameDto } from "./dto/getFilesByUserNameDto.dto";
import { AddUserFileDto } from "./dto/addUser-file.dto";
import { Injectable } from "@nestjs/common";
import { CreateFileDto } from "./dto/create-file.dto";
import { PrismaService } from "src/database/prisma.service";
import { File } from "./entities/file.entity";

@Injectable()
export class FileService {
	constructor(private readonly prisma: PrismaService) {}

	async findFile(id: string): Promise<File | void> {
		return (await this.prisma.file.findUnique({ where: { id } })) || null;
	}

	async create(createFileDto: CreateFileDto): Promise<File> {
		const { user, ...dto } = createFileDto;
		const file = await this.prisma.file.create({ data: { ...dto } });
		await this.prisma.userFile.create({
			data: { user, file: file.id, canChange: true, isAdm: true },
		});
		return file;
	}

	async addUserFile(addUserFileDto: AddUserFileDto) {
		await this.prisma.userFile.create({ data: { ...addUserFileDto } });
	}

	async updateUser(updateUserFileDto: UpdateUserFileDto) {
		const { id, ...dto } = updateUserFileDto;
		await this.prisma.userFile.update({
			where: { id },
			data: { ...dto },
		});
	}

	async getFilesByUser(user: string) {
		const filesWithUser = await this.prisma.userFile.findMany({
			where: { user },
			orderBy: {
				lastChange: "desc",
			},
			include: {
				fk_file_id: true,
			},
		});

		return filesWithUser.map((fileUser) => fileUser.fk_file_id);
	}

	async getUsersByFile(file: string) {
		const users = await this.prisma.userFile.findMany({
			where: { file },
			orderBy: {
				lastChange: "desc",
			},
			include: {
				fk_user_email: true,
			},
		});
		return users;
	}

	async getFilesByName(getFilesByUserNameDto: GetFilesByUserNameDto) {
		const { user, name } = getFilesByUserNameDto;
		const userFiles = await this.prisma.userFile.findMany({
			where: {
				user,
				fk_file_id: {
					name: {
						contains: name,
					},
				},
			},
			orderBy: {
				lastChange: "desc",
			},
			include: {
				fk_file_id: true,
			},
		});
		return userFiles.map((userFile) => userFile.fk_file_id);
	}
}
