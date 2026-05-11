import {Role} from '../../shared/domain/model/role.enum';

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
