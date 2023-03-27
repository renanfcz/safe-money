import { PrismaService } from './../../databases/prisma.service';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { Module } from "@nestjs/common";

@Module({
    controllers: [],
    providers: [CategoryResolver, CategoryService, PrismaService]
  })
  export class CategoryModule {}