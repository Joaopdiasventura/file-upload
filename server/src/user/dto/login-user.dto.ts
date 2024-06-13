import { IsNotEmpty } from "class-validator";

export class LoginUserDto {
	@IsNotEmpty({ message: "Campo 'email' não pode ficar vazio" })
	email: string;
	@IsNotEmpty({ message: "Campo 'password' não pode ficar vazio" })
	password: string;
}
