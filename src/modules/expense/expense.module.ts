import { ExpenseResolver } from './expense.resolver';
import { PrismaService } from './../../databases/prisma.service';
import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';

@Module({
  controllers: [],
  providers: [ExpenseResolver, ExpenseService, PrismaService]
})
export class ExpenseModule {}
