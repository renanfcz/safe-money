import { JwtAuthGuard } from './jwt-auth.guard';
import { Auth } from './entities/auth.entity';
import { AuthInput } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { UseGuards } from '@nestjs/common';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  async login(@Args('authInput') authInput: AuthInput): Promise<Auth> {
    return this.authService.authenticate(authInput);
  }

  @Query(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async isValidToken(): Promise<boolean> {
    return true;
  }
}