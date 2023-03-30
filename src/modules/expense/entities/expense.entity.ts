import { ExpenseGroup } from './expense.group.entity';
import { Category } from './../../category/entities/category.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { ExpenseStatus } from '@prisma/client';

@ObjectType()
export class Expense {
  @Field()
  id: string;
  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  description?: string;
  @Field({ nullable: true })
  createdAt: Date;
  @Field({ nullable: true })
  value: number;
  @Field()
  status: ExpenseStatus;
  @Field(() => Category)
  category: Category;
  @Field()
  expenseGroupId: string;
}
