import { ExpenseUpdateInput } from './dto/update-expense-input';
import { PrismaService } from './../../databases/prisma.service';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ExpenseCreateInput } from './dto/create-expense-input';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  async create(expenseCreate: ExpenseCreateInput) {
    const expense = await this.prisma.expense.create({
      data: {
        title: expenseCreate.title,
        description: expenseCreate.description,
        value: expenseCreate.value,
        category: { connect: { id: expenseCreate.categoryId } },
        user: { connect: { id: expenseCreate.userId } },
        month: expenseCreate.month,
        year: expenseCreate.year,
      },
    });
    return expense;
  }

  async findAll(id: string) {
    return await this.prisma.expense.findMany({
      where: {
        userId: id,
      },
      include: {
        category: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.expense.findFirst({
      where: { id: id },
    });
  }

  async update(id: string, updateExpenseInput: ExpenseUpdateInput) {
    try {
      return await this.prisma.expense.update({
        where: { id },
        data: updateExpenseInput,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.expense.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getSumary(id: string) {
    const expenses = await this.findAll(id);
    const user = await this.prisma.user.findFirst({ where: { id } });

    const currentDate = new Date();

    const filteredExpenses = expenses.filter((expense) => {
      const createdAtDate = new Date(expense.createdAt);
      const createdAtMonth = createdAtDate.getMonth();
      const createdAtYear = createdAtDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      return createdAtMonth === currentMonth && createdAtYear === currentYear;
    });

    const amountPaid = filteredExpenses.reduce((total, expense) => {
      if (expense.status == 'PAID') return total + expense.value;
      else return 0;
    }, 0);
    const amountToPay = filteredExpenses.reduce((total, expense) => {
      if (expense.status == 'OPEN') return total + expense.value;
      else return 0;
    }, 0);
    const totalExpenses = filteredExpenses.reduce(
      (total, expense) => total + expense.value,
      0,
    );
    const remainingBalance = user.salary - totalExpenses;
    const response = {
      amountPaid,
      amountToPay,
      totalExpenses,
      remainingBalance,
    };

    return response;
  }
}
