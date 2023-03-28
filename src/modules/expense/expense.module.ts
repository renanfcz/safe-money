import { ExpenseResolver } from './expense.resolver';
import { PrismaService } from './../../databases/prisma.service';
import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [],
  providers: [ExpenseResolver, ExpenseService, PrismaService, JwtService]
})
export class ExpenseModule {}
