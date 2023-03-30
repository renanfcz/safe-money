import { ExpenseCreateInput } from './dto/create-expense-input';
import { ExpenseGroupUpdateInput } from './dto/update-expense-group-input';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from './../../databases/prisma.service';
import { ExpenseGroupCreateInput } from './dto/create-expense-group-input';
import { ExpenseUpdateInput } from './dto/update-expense-input';
import { ExpenseGroup } from './entities/expense.group.entity';
import { connect } from 'http2';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  async create(expenseCreateInput: ExpenseCreateInput) {
    let idGroup = expenseCreateInput.expenseGroupId;
    if (!expenseCreateInput.expenseGroupId) {
      const existsGroup = await this.prisma.expenseGroup.findFirst({
        where: {
          month: expenseCreateInput.month,
          year: expenseCreateInput.year,
        }
      });

      if(!existsGroup){
        const group = await this.prisma.expenseGroup.create({
          data: {
            month: expenseCreateInput.month,
            year: expenseCreateInput.year,
            user: { connect: { id: expenseCreateInput.userId } },
          },
        });
        idGroup = group.id;
      } else {
        idGroup = existsGroup.id;
      }
    }

    const expense = this.prisma.expense.create({
      data: {
        title: expenseCreateInput.title,
        description: expenseCreateInput.description,
        value: expenseCreateInput.value,
        category: { connect: { id: expenseCreateInput.categoryId } },
        status: expenseCreateInput.status,
        expenseGroup: { connect: { id: idGroup } },
      },
      include: {
        category: true
      }
    });

    return expense;
  }

  async findAllGrouping(id: string): Promise<ExpenseGroup[]> {
    const data = await this.prisma.expenseGroup.findMany({
      where: {
        user: { id },
      },
      include: {
        user: true,
        expenses: {
          include: {
            category: true,
          },
        },
      },
    });

    return data;
  }

  async findOne(id: string) {
    return await this.prisma.expense.findFirst({
      where: { id: id },
    });
  }

  async update(id: string, updateExpenseGroupInput: ExpenseGroupUpdateInput) {
    try {
      return true;
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

  async getSumary(id: string, month: string, year: number) {
    const expensesGroups = await this.findAllGrouping(id);
    const user = await this.prisma.user.findFirst({ where: { id } });

    const filteredExpenses = expensesGroups.find((e) => {
      e.month == month && e.year == year;
    }).expenses;

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
