import {Injectable} from '@angular/core';
import {AuthRepository} from '../domain/repository/auth.repository';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';
import {User} from '../domain/model/user.entity';
import {UserResponse} from './user-response';
import {UserAssembler} from './user-assembler';

/**
 * Implementation of AuthRepository using REST API.
 * This class handles the communication with the backend, but, in this case tp1, with a fake api.
 * This is a repository to IAM context, so the name is IamApi
 */
@Injectable({ providedIn: 'root' })
export class IamApi extends AuthRepository{
  private readonly baseUrl = environment.fakeDatabaseProviderApiBaseUrl;
  private readonly userPath = environment.fakeDatabaseProviderUserEndpointPath;

  /**
   * @param http HttpClient used for communication with the fake database provider
   */
  constructor(private http: HttpClient){
    super();
  }

  /**
   * Searches for users by their email address
   * @param email the email filter by
   * @returns an Observable array of User entities
   */
  getByEmail(email: string): Observable<User | null> {
    const url = `${this.baseUrl}${this.userPath}?email=${email}`;
    return this.http.get<UserResponse[]>(url).pipe(
      map(responses => {
        if (responses.length === 0) return null;
        return UserAssembler.toEntityFromResponse(responses[0]);
      })
    );
  }

  /**
   * Register a new user in the system
   * @param user The User entity to be created
   * @returns An Observable of the persisted User entity
   */
  register(user: User): Observable<User>{
    const url=`${this.baseUrl}${this.userPath}`;
    const resource = UserAssembler.toEntityFromResource(user);
    console.log(`Post: ${url}, with body: ${resource}`)

    return this.http.post<UserResponse>(url, resource).pipe(
      map(response => UserAssembler.toEntityFromResponse(response))
    );
  }

  /**
   * Update an existing user in the system
   * @param user User entity with modified data
   * @returns Observable of the updated User entity
   */
  update(user: User): Observable<User>{
    const url = `${this.baseUrl}${this.userPath}/${user.id}`;
    const resource = UserAssembler.toEntityFromResource(user);
    return this.http.put<UserResponse>(url, resource).pipe(
      map(response => UserAssembler.toEntityFromResponse(response))
    );
  }
}
