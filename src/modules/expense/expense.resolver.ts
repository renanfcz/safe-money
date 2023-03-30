import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { ExpenseCreateInput } from './dto/create-expense-input';
import { DashboardSumary } from './entities/dashboard.sumary';
import { Expense } from './entities/expense.entity';
import { ExpenseGroup } from './entities/expense.group.entity';
import { ExpenseService } from './expense.service';

@Resolver(() => Expense)
export class ExpenseResolver {
  constructor(
    private readonly expenseService: ExpenseService,
    private readonly jwtService: JwtService,
  ) {}

  @Mutation(() => Expense)
  @UseGuards(JwtAuthGuard)
  async createExpense(
    @Args('data') data: ExpenseCreateInput,
    @Context() context,
  ) {
    const authHeader = context.req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const decoded = this.jwtService.decode(token);
    data.userId =
      typeof decoded === 'object' && 'id' in decoded ? decoded.id : null;
    return await this.expenseService.create(data);
  }

  @Query(() => [ExpenseGroup])
  @UseGuards(JwtAuthGuard)
  async findAllExpensesGrouping(@Context() context) {
    return await this.expenseService.findAllGrouping(context.req.id);
  }

  @Query(() => DashboardSumary)
  @UseGuards(JwtAuthGuard)
  async getSumaryDashboard(
    @Context() context,
    @Args('month') month: string,
    @Args('year') year: number,
  ) {
    return await this.expenseService.getSumary(context.req.id, month, year);
  }

  // @Mutation(() => Expense)
  // @UseGuards(JwtAuthGuard)
  // async updateExpense(
  //   @Args('id') id: string,
  //   @Args('updateExpensesInput') updateExpensesInput: ExpenseUpdateInput,
  // ) {
  //   return this.expenseService.update(id, updateExpensesInput);
  // }

  @Mutation(() => Expense)
  @UseGuards(JwtAuthGuard)
  async removeExpense(@Args('id', { type: () => String }) id: string) {
    return this.expenseService.remove(id);
  }
}
