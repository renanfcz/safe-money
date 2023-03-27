import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CategoryCreateInput {
  @Field()
  title: string;
  @Field({ nullable: true })
  description?: string;
}
