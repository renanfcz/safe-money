import { InputType, Field } from '@nestjs/graphql';

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
  @Field()
  userId: string;
  @Field()
  month: string;
  @Field()
  year: number;
}
