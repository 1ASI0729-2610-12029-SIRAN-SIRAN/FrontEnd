import {Injectable} from '@angular/core';
import {BabyRepository} from '../domain/repository/baby.repository';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Baby} from '../domain/model/baby.entity';
import {BabyResponse} from './baby-response';
import {BabyAssembler} from './baby-assembler';

@Injectable({ providedIn: 'root' })
export class BabyApi extends BabyRepository{
  private readonly baseUrl = environment.fakeDatabaseProviderApiBaseUrl;
  private readonly endpoint = environment.fakeDatabaseProviderBabyEndpointPath;

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Get baby by id
   * @param id
   */
  getById(id: string): Observable<Baby | null> {
    const url = `${this.baseUrl}/${this.endpoint}/${id}`;
    return this.http.get<BabyResponse>(url).pipe(
      map(response => response ? BabyAssembler.toEntityFromResponse(response) : null)
    );
  }

  /**
   * Get parent of baby by id
   * @param userId Parent's id
   */
  getByUserId(userId: string): Observable<Baby[]> {
    const url = `${this.baseUrl}/${this.endpoint}?idUser=${userId}`;
    return this.http.get<BabyResponse[]>(url).pipe(
      map(response => response.map(r => BabyAssembler.toEntityFromResponse(r)))
    );
  }

  /**
   * Registered baby using HTTP POST
   * @param baby baby's id
   */
  create(baby: Baby): Observable<Baby> {
    const url = `${this.baseUrl}/${this.endpoint}`;
    const resource = BabyAssembler.toResourceFromEntity(baby);
    return this.http.post<BabyResponse>(url, resource).pipe(
      map(response => BabyAssembler.toEntityFromResponse(response))
    );
  }

  /**
   * Update baby by id using HTTP PUT
   * @param baby baby's id
   */
  update(baby: Baby): Observable<Baby> {
    const url = `${this.baseUrl}${this.endpoint}/${baby.id}`;
    const resource = BabyAssembler.toResourceFromEntity(baby);
    return this.http.put<BabyResponse>(url, resource).pipe(
      map(response => BabyAssembler.toEntityFromResponse(response))
    );
  }

  /**
   * Delete baby by id using HTTP POST
   * @param id baby's id
   */
  delete(id: string): Observable<void> {
    const url = `${this.baseUrl}${this.endpoint}/${id}`;
    return this.http.delete<void>(url);
  }
}
