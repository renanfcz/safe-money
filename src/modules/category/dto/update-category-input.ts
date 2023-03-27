import { CategoryCreateInput } from './create-category-input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryInput extends PartialType(CategoryCreateInput) {
  @Field({ nullable: true })
  title?: string;
  @Field({ nullable: true })
  description?: string;
}
