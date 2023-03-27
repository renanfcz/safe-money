import { UpdateCategoryInput } from './dto/update-category-input';
import { CategoryCreateInput } from './dto/create-category-input';
import { PrismaService } from './../../databases/prisma.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CategoryCreateInput) {
    const existsCategory = await this.prisma.category.findFirst({
      where: {
        title: data.title,
      },
    });

    if (!existsCategory) {
      throw new HttpException(
        'A categoria com o título ' +
          data.title +
          ' já consta no banco de dados. Por favor insira um novo título',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const categorySaved = await this.prisma.category.create({
        data,
      });
      return categorySaved;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.category.findFirst({
      where: { id: id },
    });
  }

  async update(id: string, updateCategoryInput: UpdateCategoryInput) {
    const existsCategory = await this.prisma.category.findFirst({
      where: {
        title: updateCategoryInput.title,
      },
    });
    if(existsCategory) {
      throw new HttpException(
        'A categoria com o título ' +
        updateCategoryInput.title +
          ' já consta no banco de dados. Por favor insira um novo título',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      return await this.prisma.category.update({
        where: { id },
        data: updateCategoryInput,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.category.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
