import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthRepository } from './auth/auth.repository';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [PrismaService, AuthRepository],
})
export class AppModule {}
