import { Field, InputType } from '@nestjs/graphql';
import { ExpenseUpdateInput } from './update-expense-input';

@InputType()
export class ExpenseGroupUpdateInput {
  @Field({ nullable: true })
  month?: string;
  @Field({ nullable: true })
  year?: number;
  @Field({ nullable: true })
  userId?: string;
  @Field({ nullable: true })
  expenses: ExpenseUpdateInput[];
}
