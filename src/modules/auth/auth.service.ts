import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from './../../databases/prisma.service';
import { User } from './../user/entities/user.entity';
import { AuthInput } from './dto/auth.dto';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService{
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(data: AuthInput): Promise<Auth> {
    const user = await this.validateUser(data);

    if (user == null) {
      throw new Error('Credenciais inválidas');
    }

    const payload = { email: user.email, id: user.id };

    const accessToken = this.jwtService.sign(payload);

    if (accessToken == null) {
      throw new Error('Erro na geração do token');
    }

    return { token: accessToken };
  }

  async validateUser(data: AuthInput): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return null;
    }

    const passwordMatch = data.password == user.password;

    if (!passwordMatch) {
      return null;
    }

    return user;
  }
}
