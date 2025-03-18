import { Body, Controller, Delete, Get, Post, Put, Request, UseGuards } from '@nestjs/common';
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

    @UseGuards(AuthGuard)
    @Get('me')
    async me(@Request() req) {
        return req.user;
}

    //lista todos usuários
    @UseGuards(AuthGuard)
    @Get('users')
    async users() {
        return this.authService.users();
    }

    @UseGuards(AuthGuard)
    @Get('mail')
    async findByEmail(@Request() req) {
        return this.authService.findByEmail(req.query.email);
    }

    @UseGuards(AuthGuard)
    @Delete('delete')
    async delete(@Request() req) {
        return this.authService.delete(req.query.email);
    }

    @UseGuards(AuthGuard)
    @Put('update')
    async update(@Request() req) {
        return this.authService.update(req.query.email, req.body);
    }

}
