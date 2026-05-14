import {Role} from '../../shared/domain/model/role.enum';
/**
 * Represents the raw data structured received from REST API
 */
export interface UserResponse {
  id: string;
  email: string;
  password: string;
  role: string;
  name: string;
  phoneNumber: string;
  createdAt: string;
  medicalLicense: string | null;
  specialty: string | null;
}
/**
 * DTO used for communication between applications layers
 */
export interface UserResource{
  id: string;
  email: string;
  password: string;
  role: Role;
  phoneNumber: string;
  medicalLicense: string | null;
  specialty: string | null;
  createdAt: string;
  name: string;
}
