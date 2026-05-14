import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {Baby} from '../domain/model/baby.entity';
import {BabyRepository} from '../domain/repository/baby.repository';

/**
 * Centralized state management for interacts with baby
 */
@Injectable({ providedIn: 'root' })
export class BabiesStore {
  private babiesSubject = new BehaviorSubject<Baby[]>([]);
  public babies$ = this.babiesSubject.asObservable();

  /**
   * @param babyRepository contract to interact with baby
   */
  constructor(private babyRepository: BabyRepository) {}

  /**
   * Search baby
   * @param userId
   */
  loadByUser(userId: string): Observable<Baby[]> {
    return this.babyRepository.getByUserId(userId).pipe(
      tap(babies => this.babiesSubject.next(babies))
    );
  }

  /**
   * Create new baby
   * @param baby
   */
  addBaby(baby: Baby): Observable<Baby> {
    return this.babyRepository.create(baby).pipe(
      tap(newBaby => {
        const current = this.babiesSubject.value;
        this.babiesSubject.next([...current, newBaby]);
      })
    );
  }

  /**
   * Updated credentials of baby
   * @param baby
   */
  updateBaby(baby: Baby): Observable<Baby> {
    return this.babyRepository.update(baby).pipe(
      tap(updated => {
        const current = this.babiesSubject.value;
        const index = current.findIndex(b => b.id === updated.id);
        if (index !== -1) {
          current[index] = updated;
          this.babiesSubject.next([...current]);
        }
      })
    );
  }

  /**
   * Delete baby entity
   * @param id
   */
  deleteBaby(id: string): Observable<void> {
    return this.babyRepository.delete(id).pipe(
      tap(() => {
        const filtered = this.babiesSubject.value.filter(b => b.id !== id);
        this.babiesSubject.next(filtered);
      })
    );
  }
}
