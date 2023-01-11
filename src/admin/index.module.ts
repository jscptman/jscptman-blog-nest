import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import AdminLoginModule from './login/login.module';
import { CorsMiddleware } from 'src/middleware';
import UsersModule from './users/users.module';
@Module({
  imports: [AdminLoginModule, UsersModule],
})
export default class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('admin/*'); // 配置Cors
  }
}
