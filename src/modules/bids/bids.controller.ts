import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorators';
import { Role } from 'src/common/enums/roles.enum';

@Controller('/bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin, Role.User)
  @Post('/:lotId')
  async placeBid(
    @Param('lotId') lotId: number,
    @Body() body: any,
    @Req() req: Request,
  ) {
    const user = req['user'];
    return this.bidsService.placeBid(user, lotId, body);
  }
}
