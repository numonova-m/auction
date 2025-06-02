import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { Lot } from '../lots/entities/lot.entity';
import { LessThanOrEqual } from 'typeorm';
@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepo: Repository<Result>,
    @InjectRepository(Lot) private readonly lotRepo: Repository<Lot>,
  ) {}
  async moveExpiredLotsToResults() {
    const now = new Date();

    const expiredLots = await this.lotRepo.find({
      where: {
        endTime: LessThanOrEqual(now),
      },
    });
    for (const lot of expiredLots) {
      const result = this.resultRepo.create({ ...lot });
      await this.resultRepo.save(result);
      await this.lotRepo.delete({ id: lot.id });
    }
  }
  async findAllWithRelations() {
    return await this.resultRepo.find({
      relations: ['winnerUser', 'lotName', 'amountBid'],
    });
  }
}
