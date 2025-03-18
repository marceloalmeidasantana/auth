import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dtos/auth';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    async signup(@Body() authSignUpDto: SignUpDto) {

        return this.authService.signUp(authSignUpDto);
    }

    @Post('signin')
    async signin(@Body() authSingInDto: SignInDto) {

        return this.authService.signIn(authSingInDto);
    }

    e@UseGuards(AuthGuard)
    @Get('me')
    async me(@Request() req) {
        return req.user;
}
}
