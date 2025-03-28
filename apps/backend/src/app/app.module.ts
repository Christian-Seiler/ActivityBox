import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ActivitiesModule } from './activities/activities.module'
import { join } from 'path'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'dist/db/schema.gql'),
      playground: false,
      //use apollo playground
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
    }),
    ActivitiesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
