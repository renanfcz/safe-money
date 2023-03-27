import { Expense } from './../../expense/entities/expense.entity';
import { ObjectType, Field} from '@nestjs/graphql';

@ObjectType()
export class Category {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field({nullable: true})
  description?: string;

  @Field()
  createdAt: Date;
}
