import { Module } from '@nestjs/common';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bid } from './entities/bid.entity';
import { Lot } from '../lots/entities/lot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bid, Lot])],
  controllers: [BidsController],
  providers: [BidsService],
})
export class BidsModule {}
