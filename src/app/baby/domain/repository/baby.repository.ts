import {Observable} from 'rxjs';
import {Baby} from '../model/baby.entity';

/**
 * The responsibility consists of allowing the domain to interact with the baby's data.
 */
export abstract class BabyRepository{
  /**
   * Return a baby by id
   * @param id Baby's id
   */
  abstract getById(id: string): Observable<Baby | null>;

  /**
   * Returns babies linked Parent's id
   * @param userId Parent's id
   */
  abstract getByUserId(userId: string): Observable<Baby[]>;

  /**
   * Registered new baby
   * @param baby New baby
   */
  abstract create(baby: Baby): Observable<Baby>;

  /**
   * Updated credentials of baby resource
   * @param baby New credentials of baby
   */
  abstract update(baby: Baby): Observable<Baby>;

  /**
   * Delete baby resource
   * @param id Baby's id
   */
  abstract delete(id: string): Observable<void>;
}
