import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Location {
  @Field()
  city!: string
  @Field()
  state!: string
  @Field()
  country!: string
}
