import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dtos/auth';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private prismaServices: PrismaService, private jwtService: JwtService) { }

    async signUp(data: SignUpDto) {
        const userAlreadyExists = await this.prismaServices.user.findUnique({
            where: { email: data.email },
        });

        if (userAlreadyExists) {
            throw new UnauthorizedException('Usuário já existe');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await this.prismaServices.user.create({
            data
                : {
                ...data,
                password: hashedPassword,
            }
        });

        return {
            id: user.id,
            name: user.name,
            email: user.email
        };
    }

    async signIn(data: SignInDto) {
        const user = await this.prismaServices.user.findUnique({
            where: { email: data.email },
        });

        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const passwordMatch = await bcrypt.compare(data.password, user.password);

        if (!passwordMatch) {
            throw new UnauthorizedException('Credenciais inválidas');
        }   

        const accessToken = await this.jwtService.signAsync({ 
            id: user.id,
            email: user.email});

        return {accessToken};
    }
}
