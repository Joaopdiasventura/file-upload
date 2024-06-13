import { PartialType } from "@nestjs/mapped-types";
import { CreateFileDto } from "./create-file.dto";
import { IsNotEmpty } from "class-validator";

export class AddUserFileDto extends PartialType(CreateFileDto) {
	@IsNotEmpty({ message: "Campo 'isAdm' não pode ficar vazio" })
	isAdm: boolean;
	@IsNotEmpty({ message: "Campo 'canChange' não pode ficar vazio" })
	canChange: boolean;
	@IsNotEmpty({ message: "Campo 'user' não pode ficar vazio" })
	user: string;
	@IsNotEmpty({ message: "Campo 'file' não pode ficar vazio" })
	file: string;
}
