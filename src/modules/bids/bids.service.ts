import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bid } from './entities/bid.entity';
import { Repository } from 'typeorm';
import { Lot } from '../lots/entities/lot.entity';
import { User } from '../users/entities/user.entity';
import { max } from 'class-validator';

@Injectable()
export class BidsService {
  constructor(
    @InjectRepository(Bid) private bidRepo: Repository<Bid>,
    @InjectRepository(Lot) private lotRepo: Repository<Lot>,
  ) {}
  async placeBid(user: any, lotId: number, body: { amount: number }) {
    const lot = await this.lotRepo.findOne({
      where: { id: lotId },
      relations: ['bids'],
    });

    if (!lot) {
      throw new BadRequestException('bunday post mavjud emas');
    }

    if (lot.status === 'finished') {
      throw new BadRequestException('bu post uchun taklif muddati yakunlangan');
    }

    const maxPrice = lot.bids.reduce(
      (max, b) => (b.amount > max ? b.amount : max),
      0,
    );
    if (body.amount <= maxPrice) {
      throw new BadRequestException(
        "Taklif eng yuqori narxdan balandroq bo'lishi kerak!!!",
        `hozircha eng yuqori narx ${maxPrice}ga teng`,
      );
    }

    const bid = this.bidRepo.create({
      amount: body.amount,
      user: { id: user.user_id },
      lot: { id: lotId },
    });

    const saved = await this.bidRepo.save(bid);

    // ✅ Lotdagi lastBid ni yangilaymiz
    await this.lotRepo.update(lotId, { lastBid: { id: saved.id } });

    const createdBid = await this.bidRepo.findOne({
      where: { id: saved.id },
      relations: ['user', 'lot'],
    });

    return {
      message: 'Taklif berildi',
      data: createdBid,
    };
  }
}
