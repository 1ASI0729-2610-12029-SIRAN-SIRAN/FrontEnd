import {UserResource, UserResponse} from './user-response';
import {User} from '../domain/model/user.entity';
import {Role} from '../../shared/domain/model/role.enum';

export class UserAssembler {
  /**
   * Transform an Entity to send it to the server.
   * @param resource
   */
  static toEntityFromResource(resource: User): UserResource {
    return {
      id: resource.id,
      email: resource.email,
      password: resource.password,
      role: resource.role,
      phoneNumber: resource.phoneNumber,
      medicalLicense: resource.medicalLicense,
      specialty: resource.specialty,
      createdAt: resource.createdAt,
      name: resource.name,
    };
  }

  /**
   * Transform a Response to an Entity
   * @param response
   */
  static toEntityFromResponse(response: UserResponse){
    const entity = new User();
    entity.id = response.id;
    entity.email = response.email;
    entity.password = response.password;
    entity.role = response.role as Role;
    entity.phoneNumber = response.phoneNumber;
    entity.medicalLicense = response.medicalLicense;
    entity.specialty = response.specialty;
    entity.createdAt = response.createdAt;
    entity.name = response.name;

    return entity;
  }
}
