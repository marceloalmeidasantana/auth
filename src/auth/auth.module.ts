import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { jwtConstants } from './constants';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5m' },
})
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, PrismaService]
})
export class AuthModule {}
