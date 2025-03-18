import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SignUpDto } from "./dtos/auth";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthRepository {
    constructor(private prismaService: PrismaService) { }

    async createUser(signUpDto: SignUpDto) {

        const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

        const user = await this.prismaService.user.create({
            data
                : {
                ...signUpDto,
                password: hashedPassword,
            }
        });

        return {
            id: user.id,
            name: user.name,
            email: user.email
        };
    }

    async findAll() {
        return this.prismaService.user.findMany();
    }

    async findByEmail(email: string) {
        return this.prismaService.user.findUnique({
            where: { email }
        });
    }

    async delete(email: string) {
        return this.prismaService.user.delete({
            where: { email }
        });
    }

    async update(email: string, data: SignUpDto) {
        if (!data.password) {
            throw new Error('Password is required');
        }
        
        const hashedPassword = await bcrypt.hash(data.password, 10);

        return this.prismaService.user.update({
            where: { email },
            data: {
                ...data,
                password: hashedPassword
            }
        });
    }
}