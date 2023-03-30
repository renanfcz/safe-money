import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/user/entities/user.entity';

import { Expense } from './expense.entity';

@ObjectType()
export class ExpenseGroup {
  @Field()
  id: string;
  @Field()
  month: string;
  @Field()
  year: number;
  @Field(() => User)
  user: User;
  @Field(() => [Expense], { nullable: true })
  expenses?: Expense[];
}
