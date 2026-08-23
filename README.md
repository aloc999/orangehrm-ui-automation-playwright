# OrangeHRM UI Automation — Playwright + BDD

Task 1 of the 24Slides QA Automation assessment.

A production-shaped UI automation framework for [OrangeHRM demo](https://opensource-demo.orangehrmlive.com/). Scenarios are written in business-language Gherkin, executed by Playwright, and mapped to the application through a Page Object Model.

**Why OrangeHRM?** It is a realistic HRIS with authentication, people records, admin users, leave, directory, and navigation — enough surface to show framework design rather than a single happy-path script. Credentials are published on the demo login page, so the suite stays reproducible.

## Architecture

```
features/                  ← Gherkin scenarios (the living spec)
  *.feature
  steps/                   ← declarative step glue (no CSS, no clicks)
src/
  pages/                   ← Page Object Model
  config/env.ts            ← environment + credentials
  data/                    ← test data factories
playwright.config.ts       ← parallel runner, traces, HTML report
```

- **Declarative BDD.** Feature files describe outcomes (`the workforce dashboard is displayed`), not UI mechanics (`click the green button`).
- **Page Object Model.** Selectors and waits live in `src/pages`. Step files only orchestrate page objects.
- **No hard-coded sleeps.** Readiness is asserted against loaders, URLs, and roles.
- **Parallel by default.** `fullyParallel: true` with 2 workers. Guest features (`@guest`) run on a clean session; everything else reuses one administrator `storageState` so the pack does not log in 15 times.
- **Playwright Chromium.** `npx playwright install chromium` is enough — no system Chrome required.
- **Secrets stay out of git.** Demo credentials are defaults, but `.env` is the supported override.

`npm test` compiles every file in `features/` and runs it through the Playwright BDD runner.

## Prerequisites

- Node.js 18+ (20 LTS recommended)
- npm 9+
- Playwright Chromium (`npx playwright install chromium`), **or** Google Chrome (used automatically when `/usr/bin/google-chrome` is present)

## Setup

```bash
git clone https://github.com/aloc999/orangehrm-ui-automation-playwright.git
cd orangehrm-ui-automation-playwright
npm install
npx playwright install chromium
cp .env.example .env   # optional — defaults already match the public demo
```

Required packages (installed by `npm install`):

| Package | Role |
| --- | --- |
| `@playwright/test` | Runner, assertions, traces, HTML report |
| `playwright-bdd` | Gherkin → Playwright (`bddgen`) |
| `typescript` / `@types/node` | Typed page objects and steps |
| `dotenv` | `.env` configuration |

## How to run

Headless (CI / default):

```bash
npm test
```

Headed (watch the browser):

```bash
npm run test:headed
```

Interactive UI mode:

```bash
npm run test:ui
```

Smoke subset:

```bash
npm run test:smoke
```
Worker count vs. shared demo stability: the suite runs 2 workers by default (`playwright.config.ts`). Because OrangeHRM's demo instance is public and shared with other users worldwide, running more concurrent workers occasionally slows a page down enough to trip the built-in `retries: 1`. For a slower but more consistently single-attempt-pass run:

```bash
npx playwright test --workers=1
```

## Reports

After a run:

```bash
npm run report or npx playwright show-report
```

This opens the Playwright HTML report (`playwright-report/`) with pass/fail, screenshots, and videos for failed tests.

## Playwright traces

Traces are captured automatically on the first retry (`trace: 'on-first-retry'`).

1. Re-run a failing spec, or keep the `test-results/` folder from CI.
2. Open a trace zip:

```bash
npx playwright show-trace test-results/<folder>/trace.zip
```

or:

```bash
npm run trace -- test-results/<folder>/trace.zip
```

The viewer shows DOM snapshots, network, console, and the action timeline — use it before adding any wait.

## Scenarios covered

| Flow | Feature file |
| --- | --- |
| Valid / invalid / empty sign-in | `features/authentication.feature` |
| Sign out | `features/session.feature` |
| Dashboard widgets | `features/dashboard.feature` |
| Module navigation + menu search | `features/navigation.feature` |
| Add employee + employee list | `features/employee-management.feature` |
| Admin user search | `features/admin-users.feature` |
| Leave list | `features/leave.feature` |
| Corporate directory | `features/directory.feature` |
| Forgot-password journey | `features/password-recovery.feature` |

That is 9 core user flows (well above the required 7).

## Design notes for reviewers

- **Isolation.** Guest journeys (`@guest`) start on the login page. Authenticated journeys reuse `.auth/admin.json` from `src/setup/auth.setup.ts`. Employee names are timestamped so parallel PIM runs do not collide.
- **Demo-site realism.** Employee names are timestamped. Leave/directory assertions accept either records or the official empty state — the public demo is shared and wiped often.
- **Scale path.** Tags + Playwright workers + HTML/trace artifacts are the same levers you would use to grow this into a 500-scenario pack.

## Troubleshooting

**Blank screenshots/videos on Linux:** if every failure screenshot/video comes back blank white, Chromium is missing system rendering libraries. Fix:
```bash
sudo npx playwright install-deps chromium
```
Run this from inside the project folder so it resolves the local Playwright install, not a global one.

**Occasional retried tests:** this suite runs against OrangeHRM's public shared demo instance, not a private environment. Because other people use the same instance concurrently, a step can occasionally take longer than expected on the first attempt. The config's `retries: 1` (local) / `retries: 2` (CI) exists specifically to absorb this — a test marked "flaky" in the report that passes on retry is expected behavior against a shared demo site, not a framework bug.

## License

MIT
