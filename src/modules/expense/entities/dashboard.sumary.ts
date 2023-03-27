import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class DashboardSumary {
  @Field()
  amountPaid: number;
  @Field()
  amountToPay: number;
  @Field()
  totalExpenses: number;
  @Field()
  remainingBalance: number;
}
