import { Injectable } from '@angular/core';
import {BehaviorSubject, firstValueFrom, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseApiUrl: string
  private tokenSubject$: BehaviorSubject<string>
  token$: Observable<string>

  constructor(private http: HttpClient) {
    this.baseApiUrl = Environment.API_URL
    this.tokenSubject$ = new BehaviorSubject<string>('')
    this.token$ = this.tokenSubject$.asObservable()
  }

  get token(): string {
    return this.tokenSubject$.value
  }

  login(credentials: {username: string, password: string}): Promise<void> {
    return firstValueFrom(
      this.http
        .post<{token: string}>(this.baseApiUrl + 'auth/login', credentials)
        .pipe(
          map(res => this.tokenSubject$.next(res.token))
        )
    )
  }

  logout() {
    this.tokenSubject$.next('')
  }
}
