import { Field, ObjectType } from '@nestjs/graphql';

import { Category } from './../../category/entities/category.entity';

@ObjectType()
export class Expense {
  @Field()
  id: string;
  @Field({ nullable: true })
  title?: string;
  @Field({ nullable: true })
  description?: string;
  @Field({ nullable: true })
  createdAt: Date;
  @Field({ nullable: true })
  value: number;
  @Field()
  status: string;
  @Field(() => Category)
  category: Category;
  @Field()
  month: string;
  @Field()
  year: number;
}
