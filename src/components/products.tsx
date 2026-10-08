import Image from "next/image";
import { type ProductName, ProductLogo } from "./product-logo";
import { SectionHeader } from "./ui";

type Product = {
	name: ProductName;
	status: { label: string; tone: "blue" | "green" };
	desc: string;
	stack: string;
	github?: string;
	live?: string;
	shot: { src: string; alt: string };
};

const PRODUCTS: Product[] = [
	{
		name: "Grid",
		status: { label: "Private beta", tone: "blue" },
		desc: "A workspace where AI agents take tasks, work in their own environment and open pull requests.",
		stack: "SolidJS · Hono · Bun · PostgreSQL",
		shot: { src: "/shots/grid.webp", alt: "Grid board with agent tasks" },
	},
	{
		name: "School OS",
		status: { label: "Open source", tone: "green" },
		desc: "Attendance, homework, guardians and WhatsApp messages for schools. Each school gets its own tenant.",
		stack: "Next.js · NestJS · Expo · PostgreSQL",
		github: "https://github.com/shabirkhan-dev/school-os",
		shot: { src: "/shots/school-os.webp", alt: "School OS dashboard" },
	},
	{
		name: "Starter",
		status: { label: "Open source", tone: "green" },
		desc: "The monorepo every RabtX product starts from: web, mobile, API and docs with one UI layer and one CI pipeline.",
		stack: "Next.js · Expo · NestJS · Bun",
		github: "https://github.com/shabirkhan-dev/starter",
		live: "https://starter-two-henna.vercel.app",
		shot: { src: "/shots/starter.webp", alt: "Starter website" },
	},
];

const TONE = {
	blue: "bg-blue/10 text-blue",
	green: "bg-live/10 text-live",
};

function GithubIcon() {
	return (
		<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden className="size-4">
			<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
		</svg>
	);
}

function ProductCard({ p }: { p: Product }) {
	return (
		<article className="flex flex-col overflow-hidden rounded-[20px] border border-line bg-surface">
			{/* screenshot peeks in from the top-left of its own frame, so text can never run into it */}
			<div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
				<Image
					src={p.shot.src}
					alt={p.shot.alt}
					width={1120}
					height={700}
					sizes="(min-width: 1024px) 560px, 90vw"
					className="absolute left-6 top-6 w-[150%] max-w-none rounded-tl-xl border-l border-t border-line"
				/>
			</div>
			<div className="flex flex-1 flex-col p-6">
				<div className="flex h-8 items-center justify-between gap-3">
					<h3 className="flex items-center gap-2.5 text-lg font-semibold tracking-[-0.03em]">
						<ProductLogo name={p.name} className="size-[22px]" />
						{p.name}
					</h3>
					<div className="flex items-center gap-1.5">
						{p.github && (
							<a
								href={p.github}
								target="_blank"
								rel="noreferrer"
								aria-label={`${p.name} on GitHub`}
								className="grid size-8 place-items-center rounded-full border border-line bg-surface-2 transition-opacity hover:opacity-75"
							>
								<GithubIcon />
							</a>
						)}
						{p.live && (
							<a
								href={p.live}
								target="_blank"
								rel="noreferrer"
								className="flex h-8 items-center gap-1 rounded-full bg-ink pl-3 pr-2.5 text-xs font-semibold text-inv transition-opacity hover:opacity-85"
							>
								Live
								<svg viewBox="0 0 12 12" aria-hidden className="size-3">
									<path
										d="M3.5 8.5L8.5 3.5M4.5 3.5H8.5V7.5"
										stroke="currentColor"
										strokeWidth="1.4"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</a>
						)}
					</div>
				</div>
				<span
					className={`mt-3 inline-flex w-fit items-center gap-1.5 rounded-full py-1 pl-2 pr-2.5 text-xs font-medium ${TONE[p.status.tone]}`}
				>
					<span className="size-1.5 rounded-full bg-current" />
					{p.status.label}
				</span>
				<p className="mt-4 text-[15px] leading-[23px] text-ink/65">{p.desc}</p>
				<div className="mt-auto pt-6">
					<p className="border-t border-line pt-4 font-mono text-xs text-ink/50">
						<span className="sr-only">Built with </span>
						{p.stack}
					</p>
				</div>
			</div>
		</article>
	);
}

export function Products() {
	return (
		<section id="products" className="scroll-mt-24 px-4 pt-20 sm:px-20">
			<SectionHeader chip="Products" title="What we’ve built." />
			<div className="mx-auto mt-[72px] grid max-w-[640px] gap-6 lg:max-w-[1280px] lg:grid-cols-3">
				{PRODUCTS.map((p) => (
					<ProductCard key={p.name} p={p} />
				))}
			</div>
		</section>
	);
}
