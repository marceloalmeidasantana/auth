import { Body, Injectable } from '@nestjs/common';
import { SignUpDto } from './dtos/auth';

@Injectable()
export class AuthService {
    async signUp(data: SignUpDto) {
        return data;
    }
}
