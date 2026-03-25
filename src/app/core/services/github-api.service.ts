import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GithubUser } from '../models/github-user.model';
import { GithubRepo } from '../models/github-repo.model';

@Injectable({
  providedIn: 'root',
})
export class GithubApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://api.github.com';
  private readonly headers = new HttpHeaders({
    Authorization: `Bearer ${environment.githubToken}`,
    Accept: 'application/vnd.github.v3+json',
  });

  getUser(username: string) {
    return this.http.get<GithubUser>(`${this.baseUrl}/users/${username}`, {
      headers: this.headers,
    });
  }

  getRepos(username: string) {
    return this.http.get<GithubRepo[]>(
      `${this.baseUrl}/users/${username}/repos?per_page=20&sort=updated`,
      { headers: this.headers },
    );
  }
}
