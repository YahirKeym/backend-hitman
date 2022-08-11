import { Injectable, BadRequestException } from '@nestjs/common';
import { usersEntity } from 'src/modules/users/entities';
import { hitsEntity } from '../../entities';
import { IHit } from '../../types/hits.types';
import { connectionSequalize as sequelize } from 'src/database/connection/sequelize';
import { QueryTypes } from 'sequelize';
@Injectable()
export class HitsGeneralService {
  private hitsEntity = hitsEntity.HitsEntityInit();
  private usersEntity = usersEntity.UsersEntityInit();
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
            id: hitPayload.idHit,
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

  async getAllHits() {
    try {
      const hits = await sequelize().query(
        `
        SELECT hits.*, users.name as assigned_name, created.name as created_name,
        status_hits.name_status as status, status_hits.id as status_id FROM hits
        INNER JOIN users ON hits.user_assigned = users.id
        INNER JOIN users created ON hits.user_creator = created.id
        INNER JOIN status_hits ON hits.status = status_hits.id`,
        { type: QueryTypes.SELECT },
      );
      return hits;
    } catch (notifyError) {
      console.log('ERROR GET ALL HITS => ', notifyError);
      throw new BadRequestException(notifyError.message);
    }
  }
}
