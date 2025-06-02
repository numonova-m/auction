import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { LotsService } from '../lots/lots.service';
import { LotsModule } from '../lots/lots.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { Lot } from '../lots/entities/lot.entity';

@Module({
  imports: [LotsModule, TypeOrmModule.forFeature([Result, Lot])],
  controllers: [ResultController],
  providers: [ResultService, LotsService],
})
export class ResultModule {}
