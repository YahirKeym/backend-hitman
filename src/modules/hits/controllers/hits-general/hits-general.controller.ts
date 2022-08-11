import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from 'src/middleware/guards/roles.guard';
import { HitsGeneralService } from '../../services/hits-general/hits-general.service';

@Controller('hits-general')
@UseGuards(RolesGuard)
export class HitsGeneralController {
  constructor(private readonly HitsGeneralService: HitsGeneralService) {}

  @Post('/hits/create')
  @SetMetadata('roles', ['theboss', 'manager'])
  createHit(@Body() payload) {
    return this.HitsGeneralService.createHit(payload);
  }

  @Patch('/hits/update')
  @SetMetadata('roles', ['theboss', 'manager'])
  updateHit(@Body() payload) {
    return this.HitsGeneralService.updateHit(payload);
  }

  @Delete('/hits/delete/:idHit')
  @SetMetadata('roles', ['theboss', 'manager'])
  deleteHit(@Param() params: any) {
    return this.HitsGeneralService.deleteHit(params.idHit);
  }

  @Patch('/hits/re-assign-hit')
  @SetMetadata('roles', ['theboss', 'manager'])
  reAssignHit(@Body() payload) {
    return this.HitsGeneralService.reAssignHitToHitman(
      payload.hitToAssign,
      payload.hitmanToAssignHit,
    );
  }
}
