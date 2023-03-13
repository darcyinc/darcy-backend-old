import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserBody {
	@IsNotEmpty()
	@IsEmail()
	public email: string;

	@IsNotEmpty()
	@Length(8, 240)
	public password: string;
}
