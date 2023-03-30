import { Field, ObjectType } from '@nestjs/graphql';

import { ExpenseGroup } from './../../expense/entities/expense.group.entity';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  createdAt: Date;

  @Field()
  salary: number;

  @Field(() => [ExpenseGroup], {nullable: true})
  expenseGroup?: ExpenseGroup[];
}
