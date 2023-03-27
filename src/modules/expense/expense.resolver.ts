import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { ExpenseCreateInput } from './dto/create-expense-input';
import { ExpenseUpdateInput } from './dto/update-expense-input';
import { DashboardSumary } from './entities/dashboard.sumary';
import { Expense } from './entities/expense.entity';
import { ExpenseService } from './expense.service';

@Resolver(() => Expense)
export class ExpenseResolver {
  constructor(private readonly expenseService: ExpenseService) {}

  @Mutation(() => Expense)
  @UseGuards(JwtAuthGuard)
  async createExpense(@Args('data') data: ExpenseCreateInput) {
    return await this.expenseService.create(data);
  }

  @Query(() => [Expense])
  @UseGuards(JwtAuthGuard)
  async findAllExpenses(@Context() context) {
    return await this.expenseService.findAll(context.req.id);
  }

  @Query(() => DashboardSumary)
  @UseGuards(JwtAuthGuard)
  async getSumaryDashboard(@Context() context) {
    return await this.expenseService.getSumary(context.req.id);
  }

  @Mutation(() => Expense)
  @UseGuards(JwtAuthGuard)
  async updateExpense(
    @Args('id') id: string,
    @Args('updateExpensesInput') updateExpensesInput: ExpenseUpdateInput,
  ) {
    return this.expenseService.update(id, updateExpensesInput);
  }

  @Mutation(() => Expense)
  @UseGuards(JwtAuthGuard)
  async removeExpense(@Args('id', { type: () => String }) id: string) {
    return this.expenseService.remove(id);
  }
}
