import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LotsService } from './modules/lots/lots.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  

  app.setGlobalPrefix('/api');
  const configService = app.get(ConfigService);
  const Port = configService.get('PORT') ?? 3000;
  await app.listen(Port, () => {
    console.log('server is running', Port);
  });
}
bootstrap();
