# GitHub Explorer

A modern GitHub profile dashboard built with Angular 21, showcasing a signals-first architecture and B2B-oriented UI patterns.

**[Live Demo →](https://your-live-url.de)**

![GitHub Explorer Screenshot](./docs/screenshot.png)

---

## Features

- **Profile Overview** — Avatar, bio, location, stats in a compact one-line layout
- **Repository Browser** — Card grid with Signal Forms filter (search + min stars + language)
- **Sortable Table View** — Enterprise-style table with column sorting via `computed()`
- **Language Stats** — Horizontal breakdown bar with percentages
- **Activity Graph** — Self-rendered SVG contribution graph from GitHub Events API
- **Recent Searches** — localStorage-persisted search history with dropdown
- **Live Rate Limit** — Real-time display from HTTP response headers via interceptor
- **Error Handling** — Typed error states for 404, 403, 429 via central `ErrorHandlerService`
- **Skeleton Loaders** — Loading states for all data sections

---

## Tech Stack

| Category      | Technology                                             |
| ------------- | ------------------------------------------------------ |
| Framework     | Angular 21 (standalone components)                     |
| Reactivity    | Signals-first — `signal()`, `computed()`, `effect()`   |
| Data Fetching | `rxResource()` from `@angular/core/rxjs-interop`       |
| Forms         | Signal Forms (`@angular/forms/signals`) — experimental |
| Styling       | SCSS + CSS Custom Properties                           |
| Testing       | Vitest via `@angular/build:unit-test`                  |
| Linting       | ESLint + Prettier + Husky pre-commit                   |
| API           | GitHub REST API v3                                     |

---

## Architecture

```
src/app/
├── core/
│   ├── models/          # TypeScript interfaces (GithubUser, GithubRepo, ApiError...)
│   ├── services/        # GithubStateService, ErrorHandlerService, RateLimitService...
│   └── interceptors/    # RateLimitInterceptor
├── features/
│   ├── profile/         # Compact profile card
│   ├── repositories/    # Card grid with Signal Forms filter
│   ├── repo-table/      # Sortable table view
│   ├── stats/           # Language breakdown
│   └── contribution-graph/ # SVG activity graph
└── shared/
    └── components/      # StatCard, ErrorState, RecentSearches
```

### Signals-first Approach

All state lives in `GithubStateService` — no NgRx, no BehaviorSubjects:

```ts
// Single source of truth
readonly username = signal<string>('angular');

// Reactive data fetching
readonly userResource = rxResource({
  params: () => this.username(),
  stream: ({ params }) => this.api.getUser(params),
});

// Derived state — auto-updates when repos change
readonly languageStats = computed(() => {
  const repos = this.repos();
  // ...aggregate language counts
});
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Angular CLI 21+
- GitHub Personal Access Token ([create one here](https://github.com/settings/tokens))

### Installation

```bash
git clone https://github.com/YOUR-USERNAME/github-dashboard.git
cd github-dashboard
npm install
```

### Configuration

Create `src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  githubToken: 'ghp_YOUR_TOKEN_HERE',
};
```

> This file is in `.gitignore` — never commit your token.

### Development

```bash
ng serve
```

Open [http://localhost:4200](http://localhost:4200).

### Tests

```bash
npm test
```

### Build

```bash
ng build
```

Output in `dist/github-dashboard/browser/`.

---

## Signal Forms

This project uses Angular's experimental Signal Forms API (`@angular/forms/signals`) for the repository filter:

```ts
protected readonly filterModel = signal<RepoFilterModel>({
  search: '',
  minStars: '0',
});

protected readonly repoFilter = form(this.filterModel, (_path) => {});
```

The `filterModel` signal drives a `computed()` that reactively filters repos — no `valueChanges.subscribe()` needed.

---

## Background

Built as a portfolio project to demonstrate Angular 21 skills for B2B frontend roles in Germany. Deliberately avoids NgRx in favor of Angular's native signals architecture.

The logistics/commercial vehicle industry background of the developer informed the focus on data-dense, enterprise-style UI patterns over consumer aesthetics.

---

## License

MIT
