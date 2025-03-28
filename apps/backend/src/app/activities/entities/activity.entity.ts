import { Field, ObjectType } from '@nestjs/graphql'
import { Category } from './category.entity'
import { Location } from './location.entity'

@ObjectType()
export class Activity {
  @Field()
  id!: string
  @Field()
  name!: string
  @Field()
  slug!: string
  @Field({ nullable: true })
  description?: string
  @Field({ nullable: true })
  url?: string
  @Field({ nullable: true })
  category?: Category
  @Field({ nullable: true })
  location?: Location
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
}
