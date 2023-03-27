import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './../../databases/prisma.service';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: '123456',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [UserResolver, UserService, PrismaService],
})
export class UserModule {}
