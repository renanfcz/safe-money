import { InputType, Field } from '@nestjs/graphql';
import { ExpenseStatus } from '../enums/ExpenseStatus';

@InputType()
export class ExpenseUpdateInput {
  @Field({nullable: true})
  title?: string;
  @Field({nullable: true})
  description?: string;
  @Field({nullable: true})
  createdAt?: Date;
  @Field({nullable: true})
  value?: number;
  @Field({nullable: true})
  status?: ExpenseStatus;
  @Field({nullable: true})
  categoryId?: string;
  @Field({nullable: true})
  expenseGroupId?: string;
}
