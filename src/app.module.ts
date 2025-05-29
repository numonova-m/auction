import { Inject, Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { LotsModule } from './modules/lots/lots.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { extname } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { BidsModule } from './modules/bids/bids.module';
@Module({
  imports: [
    UsersModule,
    LotsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          entities: [__dirname + '*/**/*entity.{ts,js}'],
          username: configService.get('DB_USERNAME'),
          database: configService.get('DB_NAME'),
          password: configService.get('DB_PASSWORD'),
          port: configService.get('DB_PORT'),
          host: configService.get('DB_HOST'),
        };
      },
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_KEY'),
          signOptions: {
            expiresIn: '1h',
          },
        };
      },
      inject: [ConfigService],
    }),
    BidsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
