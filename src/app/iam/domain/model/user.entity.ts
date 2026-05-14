import {Role} from '../../../shared/domain/model/role.enum';

/**
 * Represent a user in SIRAN
 */
export class User {
  id: string;
  email: string;
  password: string;
  role: Role;
  phoneNumber: string;
  medicalLicense: string | null;
  specialty: string | null;
  createdAt: string;
  name: string;

  /**
   * Constructor of user
   * In the case of the role, the default value is 'PARENT', because it has the lowest security level.
   */
  constructor(){
    this.id = '';
    this.email = '';
    this.password = '';
    this.role = Role.PARENT;
    this.phoneNumber = '';
    this.medicalLicense = null;
    this.specialty = null;
    this.createdAt = '';
    this.name = '';
  }
}
