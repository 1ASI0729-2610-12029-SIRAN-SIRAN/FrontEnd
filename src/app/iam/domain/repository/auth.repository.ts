import {Observable} from 'rxjs';
import {User} from '../model/user.entity';

/**
 *
 */
export abstract class AuthRepository {
  /**
   * Search for user by associated email address
   * @param email User's email address
   */
  abstract getByEmail(email: string): Observable<User | null>;

  /**
   * Register a new User in the system
   * @param user New user with persistent data
   */
  abstract register(user: User): Observable<User>;

  /**
   * to Update credentials of user in the system
   * @param user existing user with new credentials
   */
  abstract update(user: User): Observable<User>;
}
