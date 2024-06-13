import { IsNotEmpty } from "class-validator";

export class UpdateUserFileDto {
	@IsNotEmpty({ message: "Campo 'name' não pode ficar vazio" })
	id: string;
	@IsNotEmpty({ message: "Campo 'name' não pode ficar vazio" })
	isAdm: boolean;
	@IsNotEmpty({ message: "Campo 'name' não pode ficar vazio" })
	canChange: boolean;
}
