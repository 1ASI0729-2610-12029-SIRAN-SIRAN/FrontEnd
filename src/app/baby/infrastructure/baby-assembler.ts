import {BabyResource, BabyResponse} from './baby-response';
import {Baby} from '../domain/model/baby.entity';

export class BabyAssembler {
  /**
   * Transform an Entity into resource to send at the server
   * @param entity
   */
  static toResourceFromEntity(entity: Baby): BabyResource {
    return {
      id: entity.id,
      name: entity.name,
      birthday: entity.birthday,
      gender: entity.gender,
      idUser: entity.idUser
    };
  }

  /**
   * Transform a Response to Baby entity
   * @param response
   */
  static toEntityFromResponse(response: BabyResponse): Baby {
    const entity = new Baby();
    entity.id = response.id;
    entity.name = response.name;
    entity.birthday = response.birthday;
    entity.gender = response.gender;
    entity.idUser = response.idUser;

    return entity;
  }
}
