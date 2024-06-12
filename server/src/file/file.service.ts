import { Injectable } from "@nestjs/common";
import { CreateFileDto } from "./dto/create-file.dto";
import { UpdateFileDto } from "./dto/update-file.dto";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class FileService {
	constructor(private readonly prisma: PrismaService) {}
	async create(createFileDto: CreateFileDto) {
		return await this.prisma.file.create({ data: { ...createFileDto } });
	}

	findAll() {
		return `This action returns all file`;
	}

	findOne(id: number) {
		return `This action returns a #${id} file`;
	}

	update(id: number, updateFileDto: UpdateFileDto) {
		return `This action updates a #${id} file`;
	}

	remove(id: number) {
		return `This action removes a #${id} file`;
	}
}
