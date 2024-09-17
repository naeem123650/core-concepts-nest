import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TestMiddleware } from './middlewares/test/test.middleware';
// import { AuthMiddleware } from './middlewares/auth/auth.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(TestMiddleware)
    //   .forRoutes(
    //     {
    //       path: 'users',
    //       method: RequestMethod.GET,
    //     },
    //     {
    //       path: 'users/:id',
    //       method: RequestMethod.GET,
    //     },
    //   )
    //   .apply(AuthMiddleware)
    //   .forRoutes(
    //     {
    //       path: 'users',
    //       method: RequestMethod.GET,
    //     },
    //     {
    //       path: 'users/:id',
    //       method: RequestMethod.GET,
    //     },
    //   );
    // or
    // AuthMiddleware
    consumer.apply(TestMiddleware).forRoutes(
      {
        path: 'users',
        method: RequestMethod.GET,
      },
      {
        path: 'users/:id',
        method: RequestMethod.GET,
      },
    );
  }
}
