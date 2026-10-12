---
title: "Architecting a project for the agent era"
slug: architecture-for-the-agent-era
excerpt: "How I structure a codebase so coding agents can read it, change it and not break it"
standfirst: "When agents write most of the code, the architecture stops being a diagram in someone's head. It becomes the instructions every agent reads before it touches a file. These are the patterns from RabtX Starter and Grid that make that work."
publishedAt: 2026-10-12
cover: /writing/architecture-for-the-agent-era.jpg
---

::lead A coding agent does not remember your last architecture meeting. It opens the repository cold, reads what it can find, and copies the patterns it sees. So the structure of the codebase is now the most important prompt you will ever write. Every project at RabtX starts from the same monorepo, RabtX Starter, and Grid grew out of it. This is the architecture they share and why each piece is there.

## Architecture is now the prompt

A human joining a team learns the unwritten rules over weeks: where things go, what not to import, which file is the real source of truth. An agent gets none of that. It has the files in front of it and the instructions you point it to, and it will happily invent a fourth way of doing something if the first three are not obvious.

That changes what good architecture means. It is no longer enough for the structure to be sensible. It has to be **legible** (an agent can find the right place for a change), **bounded** (a change in one place cannot quietly reach everywhere), and **enforced** (when a rule is broken, a machine says so before a person has to).

## The shape: one monorepo, thin apps, shared packages

Starter is a Bun workspaces and Turborepo monorepo with every app and every shared package in one place:

```text filename="rabtx starter"
starter/
├── apps/
│   ├── web/          # Next.js: routes, admin, auth, billing
│   ├── mobile/       # Expo
│   ├── nest-api/     # the API: modules, common HTTP pieces, validated config
│   ├── docs/         # the only home for project docs
│   ├── ai-api/       # optional FastAPI service, never public
│   └── rust/         # optional Rust service
├── packages/
│   ├── ui/           # primitives every app shares
│   ├── logger/       # one structured logger, TS and Rust
│   └── typescript-config/
├── .agents/          # rules, roles, board, skills: the agents' handbook
├── scripts/          # architecture and naming checks, git hooks
├── AGENTS.md         # read this first
└── DESIGN.md         # the design system, in words
```

The rule behind it is short: **keep apps thin and put reusable behaviour in packages.** An app is routing, composition and the parts that are genuinely its own. Anything two apps need lives in a package with a name like `@starter/ui`, imported the same way everywhere.

For agents, the monorepo is the point. One clone holds the API, the web app and the UI kit, so an agent changing an endpoint can see every caller of it. One lint, format, typecheck and test surface means one command proves the whole change. And one copy of each shared piece means an agent cannot "fix" a button in one app and leave the other three behind.

## Modules with one front door

Inside an app, features are modules, and every module has exactly one public entrypoint: its `index.ts`. Everything else in the folder is private.

```text filename="apps/web/src"
app/          # routing and composition only
modules/      # one folder per feature: auth, billing, chat, users…
  billing/
    index.ts  # the front door: what other code may import
    …         # components, data and logic, private to the module
components/   # reusable visual pieces
lib/          # framework-agnostic helpers
```

A route imports `@/modules/billing`, never `@/modules/billing/components/plan-card`. That one rule gives an agent a map: to use a feature, read its `index.ts`; to change a feature, stay inside its folder. It also means a module's insides can be refactored freely, because nothing outside depends on them.

This is not a convention I hope agents follow. It is a check:

```bash filename="scripts/architecture/check-boundaries.sh"
# Outside a module, consumers import public entrypoints only, not deep paths.
rg -n 'from\s+"@/modules/[^"]+/[^"]+/[^"]+"' apps/web/src/app apps/web/src/components apps/web/src/lib

# Packages stay app-agnostic and never import an app's '@/...' alias.
rg -n 'from\s+"@/' packages

# Apps never reach into each other with relative paths.
rg -n '\.\./\.\./apps/' apps
```

Each search must come back empty, and the script runs in the pre-commit hook and in CI. An agent that takes a shortcut finds out in seconds, with the exact line, instead of in review a day later.

## The same layers in every API

The API follows one shape: a thin transport layer, plain logic in the middle, data access at the bottom, and cross-cutting HTTP concerns kept in their own folder.

In Starter's NestJS API that is a module per feature (`users.module.ts`, `users.service.ts`, `users.repository.ts`, `users.types.ts`), with filters, interceptors, pipes and middleware in `src/common/` and configuration in `src/config/`. Controllers stay thin, business logic lives in services, and only repositories talk to the database.

Grid replaced NestJS with Hono on Bun, and the shape did not change: `src/modules/*` holds each feature's `routes.ts` plus plain functions for logic and queries, `src/http/*` holds the envelope, errors, validation, sign-in check, rate limits and request ids, and the schema and migrations moved into a shared `packages/db`.

That is the real test of an architecture: you can swap the framework and keep the map. An agent that learned where things go in one project already knows where they go in the next.

## Validate config at the edge

Environment variables are the most common way a working change breaks in production, and agents add them freely. So configuration is parsed once, at startup, against a schema:

```ts filename="apps/nest-api/src/config/env.schema.ts (excerpt)"
export const envSchema = z
	.object({
		NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
		PORT: z.coerce.number().int().positive().default(4000),
		DATABASE_URL: z.url().default('postgresql://starter:starter@localhost:5433/starter'),
		DATABASE_POOL_MAX: z.coerce.number().int().min(1).max(50).default(10),
		JWT_SECRET: z.string().min(32).default(developmentJwtSecret),
		SESSION_TTL_DAYS: z.coerce.number().int().min(1).max(365).default(30),
		// …
	})
```

The app reads typed config through one config service instead of reaching for `process.env` wherever it likes. A missing or malformed value stops the process with a clear message instead of surfacing as a strange bug three requests later. And when an agent needs a new setting, there is exactly one place to add it.

## One home for every truth

The fastest way to confuse an agent is two documents that disagree. So every kind of truth has exactly one home, and everything else links to it:

| Truth | Its one home |
| --- | --- |
| How to work in the repo | `AGENTS.md`, then `.agents/` |
| Who may change which paths | `.agents/ownership.yaml` |
| The design system | `DESIGN.md` |
| The API contract | `apps/docs/content/docs/backend-api.mdx` |
| Project docs | the docs app; there is no root `docs/` folder |
| Decisions and their reasons | ADRs under `/docs/architecture` |

`.agents/` is the single source for agent rules, skills and plans, with no second copy for each editor. When a doc and the code drift, that is a bug to fix the same day, because the next agent will believe whichever one it read first.

## Names are an index

Agents navigate by search, so names are part of the architecture. Every file and folder under a TypeScript `src/` is kebab-case, with dotted roles where a framework expects them (`auth.service.ts`, `users.module.ts`) and the router's own segments allowed (`(auth)`, `[id]`, `@slot`). A naming check enforces it beside the boundary check.

It sounds small. In practice it means `billing` is always `billing`, a search for a feature finds all of it, and an agent never creates `BillingPage.tsx` next to `billing-page.tsx`.

## Give agents write boundaries

Reading the whole repository is fine; writing anywhere is not. Grid makes that explicit in a machine-readable map:

```yaml filename=".agents/ownership.yaml (trimmed)"
policy:
  default: deny-unowned-writes
  read_access: broad-for-understanding
  write_access: card-scope-only

roles:
  backend:
    paths: [apps/api/**, packages/db/**, apps/runner/**]
  web:
    paths: [apps/console/**, apps/web/**]
```

Each task is a card with a scope narrower than the role's paths, on its own branch and worktree. An agent that finds a problem outside its scope raises a card for the owner instead of fixing it in passing. I wrote about how that plays out day to day in [Building Grid with the agents it runs](/writing/building-grid-with-the-agents-it-runs); the architectural point is that the boundaries are files, so they can be read, reviewed and checked like code.

## Turn rules into checks

Every rule above that matters is also a test, a script or a hook, because a rule that only lives in a document is a suggestion:

- **Import boundaries and naming:** `bun run architecture:check`, in pre-commit and CI.
- **Design rules:** Grid's console fails the build on a font size outside the type scale, a one-off animation duration or a fixed corner radius.
- **The API contract:** in Grid, a CI job migrates and seeds a real Postgres, starts the API, waits for its health check, and runs the contract suite against it.
- **The basics on every commit:** format, lint, typecheck, the architecture check, a large-file guard, a secret scan and Conventional Commit messages, all in Lefthook.

The effect on agent work is huge. Instead of reviewing every diff for the same ten mistakes, I review the intent, and the machine catches the rest with a message the agent can act on.

## Strong default, overridable

None of this is meant to be rigid. Starter's first architecture decision record says it plainly: strong defaults with automated guardrails, and a documented way to override them per project. An override needs a written reason in `/docs/overrides`, a project can add its own stricter rules, and overrides should add to the default rather than tear it out.

That balance is what lets one starter become very different products. Grid swapped the API framework and added a Solid console, and kept the same layers, checks and `.agents/` handbook. School OS, a multi-tenant school platform, runs the same Next.js, Expo and NestJS stack. Because the map stays the same, an agent, or a person, can move between projects without relearning where things go.

## A checklist for an agent-ready repo

- An `AGENTS.md` at the root that says what to read, in what order.
- Apps that are thin, and packages for anything shared.
- One public entrypoint per module, and a check that blocks deep imports.
- The same layers in every service: transport, logic, data, and cross-cutting concerns apart.
- Configuration validated once, at startup, against a schema.
- One home for each truth, linked from everywhere else.
- Names that are consistent enough to search, enforced by a check.
- Write boundaries in a file, and tasks scoped narrower than roles.
- Every important rule backed by a test, a script or a hook.
- A written path for breaking the rules on purpose.

## Closing

Agents made code cheap to write and expensive to trust. Architecture is how you get the trust back: a structure an agent can read, boundaries it cannot cross by accident, and checks that tell it when it tried. Get that right once, in a starter, and every project after it begins already knowing where things go.
