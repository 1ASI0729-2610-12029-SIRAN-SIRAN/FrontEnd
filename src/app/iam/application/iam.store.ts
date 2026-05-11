import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';
import {User} from '../domain/model/user.entity';
import {Router} from '@angular/router';
import {IamApiRepository} from '../infrastructure/iam-api.repository';
/**
 * Centralized state management for authentication and user sessions
 * Acts as the Single Source of Truth for the current user's state
 */
@Injectable({ providedIn: 'root' })
export class AppStore {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  /**
   * @param authRepository Contract to interact with identity and access data
   * @param router For handling navigation after auth events
   */
  constructor(private authRepository: IamApiRepository, private router: Router) {
    const stored = localStorage.getItem('currentUser');
    let initialUser: User | null = null;
    if (stored) {
      const parsed = JSON.parse(stored);
      initialUser = Object.assign(new User(), parsed);
    }

    this.currentUserSubject = new BehaviorSubject<User | null>(initialUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  /**
   * Authentication a user by email and password
   * @param email The user's identification email
   * @param password The raw user's identification to validate
   */
  login(email: string, password: string): Observable<boolean>{
    return this.authRepository.getByEmail(email).pipe(
      map(user=> {
        if (user && user.password === password){
          console.log('login success');
          this.setCurrentUser(user);
          return true;
        }
        console.log(`email: ${email} or password: ${password} not found`);
        return false;
      })
    )
  }

  /**
   * Updates the current user state and persists it in local storage
   * @param user The authenticated User entity
   */
  private setCurrentUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  /**
   * Clears the session and redirects the user to the login page
   */
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  /**
   * Register a new user
   * @param userData credentials to register
   * @returns post in authRepository
   */
  register(userData: Omit<User, 'id' | 'createdAt'>): Observable<User> {
    console.log(`AppStore registered: ${JSON.stringify(userData)}`);
    const newUser = new User();
    Object.assign(newUser, userData);
    return this.authRepository.register(newUser).pipe(
      tap(user => {
        console.log(`User registered success: ${JSON.stringify(user)}`);
        this.setCurrentUser(user);
        this.router.navigate(['/login']);
      })
    );
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
}
