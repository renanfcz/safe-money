import { UserCreateInput } from './create-user.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(UserCreateInput) {
  @Field({nullable: true})
  name?: string;

  @Field({nullable: true})
  email?: string;

  @Field({nullable: true})
  password?: string;

  @Field({nullable: true})
  salary?: number;
}
