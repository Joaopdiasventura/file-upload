import { IsNotEmpty } from "class-validator";

export class CreateFileDto {
	@IsNotEmpty({ message: "Campo 'name' não pode ficar vazio" })
	name: string;
	@IsNotEmpty({ message: "Campo 'user' não pode ficar vazio" })
	user: string;
	@IsNotEmpty({ message: "Campo 'metadata' não pode ficar vazio" })
	metadata: any;
}
