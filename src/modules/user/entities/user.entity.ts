import { Expense } from './../../expense/entities/expense.entity';
import { ObjectType, Field } from '@nestjs/graphql';

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

  @Field(() => [Expense], { nullable: true })
  expenses?: Expense[];
}
