import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserCreateInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  salary: number;
}
