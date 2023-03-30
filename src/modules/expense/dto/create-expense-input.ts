import { InputType, Field } from '@nestjs/graphql';
import { ExpenseStatus } from '@prisma/client';

@InputType()
export class ExpenseCreateInput {
  @Field()
  title: string;
  @Field({ nullable: true })
  description?: string;
  @Field({ nullable: true })
  value: number;
  @Field()
  categoryId: string;
  @Field({ nullable: true })
  expenseGroupId?: string;
  @Field({ nullable: true })
  status?: ExpenseStatus;
  @Field({ nullable: true })
  month?: string;
  @Field({ nullable: true })
  year?: number;
  @Field({ nullable: true })
  userId?: string;
}
