import { Injectable, BadRequestException } from '@nestjs/common';
import { hitsEntity } from '../../entities';
import { IHit } from '../../types/hits.types';

@Injectable()
export class HitsGeneralService {
  private hitsEntity = hitsEntity.HitsEntityInit();

  async createHit(hitPayload: IHit) {
    try {
      await this.hitsEntity.create({
        description_hit: hitPayload.descriptionHit,
        name_target: hitPayload.nameTarget,
        user_assigned: hitPayload.userAssigned,
        user_creator: hitPayload.userCreator,
      });
    } catch (notifyError) {
      console.log('ERROR CREATE HIT => ', notifyError);
      throw new BadRequestException(notifyError.message);
    }
    return { status: 'hitCreated' };
  }

  async updateHit(hitPayload: IHit) {
    try {
      await this.hitsEntity.update(
        {
          status: hitPayload.status,
          description_hit: hitPayload.descriptionHit,
          name_target: hitPayload.nameTarget,
        },
        {
          where: {
            id_hit: hitPayload.idHit,
          },
        },
      );
    } catch (notifyError) {
      console.log('ERROR UPDATE HIT => ', notifyError);
      throw new BadRequestException(notifyError.message);
    }
    return { status: 'hitUpdated' };
  }

  async deleteHit(hitToDelete: number) {
    try {
      await this.hitsEntity.update(
        {
          status: 2,
        },
        {
          where: {
            id_hit: hitToDelete,
          },
        },
      );
    } catch (notifyError) {
      throw new BadRequestException('error to delete hit');
    }
    return { status: 'hitDeleted' };
  }

  async reAssignHitToHitman(hitToAssign: number, hitmanToAssignHit: number) {
    try {
      const hit = await this.hitsEntity.findOne({
        where: {
          id: hitToAssign,
        },
      });
      if (!hit) {
        throw new BadRequestException('Hit to assign not found');
      }
      await this.hitsEntity.update(
        {
          user_asigned: hitmanToAssignHit,
        },
        {
          where: {
            id_hit: hitToAssign,
          },
        },
      );
    } catch (notifyError) {
      console.log('ERROR ASSIGN HIT => ', notifyError);
      throw new BadRequestException(notifyError.message);
    }
    return { status: 'hitAsiggned' };
  }

  async getHitsForUser(userId: number) {
    try {
      const hits = await this.hitsEntity.findAll({
        where: {
          user_assigned: userId,
        },
      });
      return hits;
    } catch (notifyError) {
      console.log('ERROR GET HITS FOR USER => ', notifyError);
      throw new BadRequestException(notifyError.message);
    }
  }
}
