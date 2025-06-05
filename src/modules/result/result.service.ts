import { Injectable, OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { Lot } from '../lots/entities/lot.entity';

@Injectable()
export class ResultService implements OnModuleInit {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepo: Repository<Result>,
    @InjectRepository(Lot)
    private readonly lotRepo: Repository<Lot>,
  ) {}

  async onModuleInit() {
    await this.restoreActiveLotTimer();
  }

  async restoreActiveLotTimer() {
    const activeLots = await this.lotRepo.find({
      where: { status: 'active' },
      relations: ['bids', 'bids.user'],
    });

    activeLots.forEach((lot) => {
      const delay = lot.endTime.getTime() - Date.now();

      const finishLot = async () => {
        await this.lotRepo.update({ id: lot.id }, { status: 'finished' });

        if (!lot.bids || lot.bids.length === 0) return;

        const topBid = lot.bids.reduce((max, current) => {
          return current.amount > max.amount ? current : max;
        }, lot.bids[0]);

        if (topBid?.user) {
          const result = this.resultRepo.create({
            winnerUser: topBid.user,
            lotName: lot,
            amountBid: topBid,
          });

          await this.resultRepo.save(result);
        }
      };

      if (delay > 0) {
        setTimeout(finishLot, delay);
      } else {
        finishLot();
      }
    });
  }
}
