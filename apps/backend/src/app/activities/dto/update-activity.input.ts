import { CreateActivityInput } from './create-activity.input'
import { Field, InputType, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateActivityInput extends PartialType(CreateActivityInput) {
  @Field(() => Int)
  id!: number
}
