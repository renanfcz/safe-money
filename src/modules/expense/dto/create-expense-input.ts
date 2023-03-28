import { InputType, Field } from '@nestjs/graphql';
import { ExpenseStatus } from '../enums/ExpenseStatus';

@InputType()
export class ExpenseCreateInput {
  @Field({nullable: true})
  title?: string;
  @Field({nullable: true})
  description?: string;
  @Field({nullable: true})
  value: number;
  @Field()
  categoryId: string;
  @Field({nullable: true})
  userId?: string;
  @Field()
  month: string;
  @Field()
  year: number;
  @Field()
  status: ExpenseStatus;
}
