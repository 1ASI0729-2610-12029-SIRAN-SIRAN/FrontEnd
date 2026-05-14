import {Gender} from '../../shared/domain/model/gender.enum';
/**
 * Represents the raw data structured received from REST API
 */
export interface BabyResponse{
  id: string;
  name: string;
  birthday: string;
  gender: Gender;
  idUser: string;
}
/**
 * DTO used for communication between applications layers
 */
export interface BabyResource {
  id: string;
  name: string;
  birthday: string;
  gender: Gender;
  idUser: string;
}
