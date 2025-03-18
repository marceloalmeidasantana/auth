import { IsEmail, IsNotEmpty } from "class-validator";

export class SignUpDto {
    @IsNotEmpty({message: 'Nome é obrigatório'})
    name: string;

   @IsEmail({}, {message: 'E-mail inválido'})
    email: string;

    @IsNotEmpty({message: 'Senha é obrigatório'})
    password: string;
}
export class SignInDto {
    @IsEmail({}, {message: 'E-mail inválido'})
    email: string;

    @IsNotEmpty({message: 'Senha é obrigatório'})
    password: string;
}
