import { UpdateCategoryInput } from './dto/update-category-input';
import { CategoryCreateInput } from './dto/create-category-input';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Query } from '@nestjs/graphql';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  async createCategory(@Args('createCategoryInput') createCategoryInput: CategoryCreateInput) {
    return await this.categoryService.create(createCategoryInput);
  }

  @Query(() => [Category])
  async findAllCategories() {
    return await this.categoryService.findAll();
  }

  @Mutation(() => Category)
  async updateCategory(
    @Args("id") id: string,
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput) {
    return this.categoryService.update(id, updateCategoryInput);
  }

  @Mutation(() => Category)
  async removeCategory(@Args('id', { type: () => String }) id: string) {
    return this.categoryService.remove(id);
  }
}
