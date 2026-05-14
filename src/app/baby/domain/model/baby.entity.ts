import {Gender} from '../../../shared/domain/model/gender.enum';

/**
 * Represents a Baby in SIRAN
 */
export class Baby{
  id: string;
  name: string;
  birthday: string;
  gender: Gender;
  idUser: string;

  /**
   * Baby constructor
   * For gender, the default value is 'NOT_INFO'.
   * In other words, if a parent doesn't wish to provide this information, it is set to 'NOT_INFO'.
   */
  constructor(){
    this.id = '';
    this.name = '';
    this.birthday = '';
    this.gender = Gender.NONE;
    this.idUser = '';
  }
}
