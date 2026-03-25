export interface GithubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  blog: string | null;
  email: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}
