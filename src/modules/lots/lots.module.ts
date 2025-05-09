import { Module } from '@nestjs/common';
import { LotsService } from './lots.service';
import { LotsController } from './lots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lot } from './entities/lot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lot])],
  controllers: [LotsController],
  providers: [LotsService],
})
export class LotsModule {}
