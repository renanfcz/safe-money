import { PrismaService } from './../../databases/prisma.service';
import { User } from './entities/user.entity';
import { UserCreateInput } from './dto/create-user.input';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: UserCreateInput) {
    const existsUser = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (existsUser) {
      throw new HttpException(
        'O usuário com o email ' +
          data.email +
          ' já consta no banco de dados. Por favor insira um novo email',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const userSaved = await this.prisma.user.create({
        data,
      });

      return userSaved;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.user.findFirst({
      where: { id: id },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserInput,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.findOneByEmail(email);
      if (user.email == email && user.password == password) return user;
      else
        throw new HttpException(
          'Email ou senha incorreto',
          HttpStatus.UNAUTHORIZED,
        );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
