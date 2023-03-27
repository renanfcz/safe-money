import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ExpenseUpdateInput {
  @Field({nullable: true})
  title?: string;
  @Field({nullable: true})
  description?: string;
  @Field({nullable: true})
  value?: number;
  @Field({nullable: true})
  categoryId?: string;
}
