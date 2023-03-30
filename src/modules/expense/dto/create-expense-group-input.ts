import { Field, InputType } from '@nestjs/graphql';

import { ExpenseCreateInput } from './create-expense-input';

@InputType()
export class ExpenseGroupCreateInput {
  @Field()
  month: string;
  @Field()
  year: number;
  @Field()
  userId: string;
  @Field(() => [ExpenseCreateInput], { nullable: true })
  expenses: ExpenseCreateInput[];
}
