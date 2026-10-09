import type { ProductName } from "@/components/product-logo";

export type Product = {
	name: ProductName;
	/** The product page lives at /products/{slug}. */
	slug: string;
	/** When the product page last changed, for the sitemap. */
	updatedAt: string;
	label: string;
	status: { label: string; tone: "blue" | "green" };
	desc: string;
	stack: string;
	/** schema.org applicationCategory for the product page. */
	category: string;
	about: string[];
	facts: [string, string][];
	screens: string[];
	github?: string;
	live?: string;
};

export const PRODUCTS: Product[] = [
	{
		name: "Grid",
		slug: "grid",
		updatedAt: "2026-10-09",
		label: "Agent workspace",
		status: { label: "Open-source beta", tone: "blue" },
		desc: "A workspace where AI agents take tasks, work in their own environment and open pull requests.",
		stack: "SolidJS · Hono · Bun · PostgreSQL",
		category: "DeveloperApplication",
		about: [
			"A self-hosted workspace where people and AI coding agents share one project board, live agent threads, a file editor, terminals and pull request checks, from desktop or phone.",
			"Works with Claude Code, Codex, opencode and any ACP agent.",
		],
		facts: [
			["Stack", "SolidJS, Hono, PostgreSQL, Bun"],
			["Status", "Open-source beta"],
			["Started", "2025"],
		],
		screens: [
			"/projects/grid-board.webp",
			"/projects/grid-thread.webp",
			"/projects/grid-home.webp",
			"/projects/grid-pr.webp",
			"/projects/grid-ship.webp",
		],
		github: "https://github.com/rabtx/grid",
		live: "https://grid.rabtx.dev",
	},
	{
		name: "School OS",
		slug: "school-os",
		updatedAt: "2026-10-09",
		label: "School platform",
		status: { label: "Open source", tone: "green" },
		desc: "Attendance, homework, guardians and WhatsApp messages for schools. Each school gets its own tenant.",
		stack: "Next.js · NestJS · Expo · PostgreSQL",
		category: "EducationalApplication",
		about: [
			"A multi-tenant school platform: a teacher scans a student's QR code at the gate, the parent gets a WhatsApp alert, and the principal's dashboard updates.",
			"Students, guardians, staff, attendance, homework and assessments are built; parent alerts are next.",
		],
		facts: [
			["Stack", "Next.js, Expo, NestJS, PostgreSQL"],
			["Status", "In development"],
			["Started", "2025"],
		],
		screens: ["/projects/school-os.webp", "/projects/school-os-students.webp"],
		github: "https://github.com/rabtx/school-os",
	},
	{
		name: "Starter",
		slug: "starter",
		updatedAt: "2026-10-09",
		label: "SaaS monorepo",
		status: { label: "Open source", tone: "green" },
		desc: "The monorepo every RabtX product starts from: web, mobile, API and docs with one UI layer and one CI pipeline.",
		stack: "Next.js · Expo · NestJS · Bun",
		category: "DeveloperApplication",
		about: [
			"A production-ready SaaS monorepo on Bun and Turborepo: Next.js, Expo, NestJS, Fumadocs and FastAPI apps sharing one UI layer, one TypeScript config and one CI pipeline.",
		],
		facts: [
			["Stack", "Next.js, Expo, NestJS, Bun, Turborepo"],
			["License", "MIT / Apache-2.0"],
			["Started", "2025"],
		],
		screens: ["/projects/starter.webp"],
		github: "https://github.com/rabtx/starter",
		live: "https://starter-two-henna.vercel.app",
	},
];

export const STATUS_TONE = {
	blue: "bg-blue/10 text-accent-ink",
	green: "bg-live/10 text-live-ink",
};

export function getProduct(slug: string) {
	return PRODUCTS.find((p) => p.slug === slug) ?? null;
}
