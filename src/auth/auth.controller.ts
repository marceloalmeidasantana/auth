import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/auth';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signup(@Body() authSignUpDto: SignUpDto){

        await this.authService.signUp(authSignUpDto);
        
        return authSignUpDto;
    }

    @Post('signin')
    async signin(){
        return 'signin';
    }
}
