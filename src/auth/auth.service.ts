import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dtos/auth';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';


@Injectable()
export class AuthService {
    constructor(private prismaServices: PrismaService,
        private jwtService: JwtService,
        private authRepository: AuthRepository) { }

    async signUp(data: SignUpDto) {
        const userAlreadyExists = await this.prismaServices.user.findUnique({
            where: { email: data.email },
        });

        if (userAlreadyExists) {
            throw new UnauthorizedException('Usuário já existe');
        }

        return this.authRepository.createUser(data);
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
            name: user.name,
            email: user.email
        });

        return { accessToken };
    }

    async users() {
        return this.authRepository.findAll();
    }

    async findByEmail(email: string) {
        return this.authRepository.findByEmail(email);
    }

    async delete(email: string) {
        return this.authRepository.delete(email);
    }

    async update(email: string, data: SignUpDto) {
        return this.authRepository.update(email, data);
    }
}
