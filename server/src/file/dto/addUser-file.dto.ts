import { PartialType } from "@nestjs/mapped-types";
import { CreateFileDto } from "./create-file.dto";

export class AddUserFileDto extends PartialType(CreateFileDto) {
	isAdm: boolean;
	canChange: boolean;
	user: string;
	file: string;
}
