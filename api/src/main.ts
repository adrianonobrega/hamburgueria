import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { LoggingInterceptor } from './errors/errors.interceptor';
// import { HttpExceptionFilter } from './errors/HttpExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new HttpExceptionFilter())
  // app.useGlobalInterceptors(new LoggingInterceptor())
  await app.listen(9000);
}
bootstrap();
