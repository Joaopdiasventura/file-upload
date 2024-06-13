import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
	@IsNotEmpty({ message: "Campo 'email' não pode ficar vazio" })
	email: string;
	@IsNotEmpty({ message: "Campo 'name' não pode ficar vazio" })
	name: string;
	@IsNotEmpty({ message: "Campo 'password' não pode ficar vazio" })
	password: string;
}
