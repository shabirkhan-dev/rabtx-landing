import Image from "next/image";
import type { ReactNode } from "react";
import { LogoTile } from "./logo";

const TASKS = [
	{ title: "Design the onboarding flow", agent: "claude-code", dot: "bg-blue" },
	{ title: "Add tenant isolation tests", agent: "codex", dot: "bg-claude" },
	{ title: "Ship attendance export", agent: "opencode", dot: "bg-live" },
];

const SERVICES = [
	{ name: "grid", state: "beta", tone: "text-blue", dot: "bg-blue" },
	{ name: "school os", state: "staging", tone: "text-[#D9A23B]", dot: "bg-[#D9A23B]" },
	{ name: "starter docs", state: "live", tone: "text-live", dot: "bg-live" },
];

const LAYERS: [string, number, number][] = [
	["UI", 0, -70],
	["API", 61, -35],
	["DB", 61, 35],
	["AI", 0, 70],
	["CI", -61, 35],
	["OPS", -61, -35],
];

function Step({ icon, label, desc, children }: { icon: string; label: string; desc: string; children: ReactNode }) {
	return (
		<div className="border-b border-line px-6 pb-8 pt-[30px] last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
			<div className="relative h-[180px]">{children}</div>
			<p className="mt-[22px] flex items-center gap-2 text-sm font-medium tracking-[-0.02em]">
				<span className="text-xs">{icon}</span>
				{label}
			</p>
			<p className="mt-2 max-w-[320px] text-xs leading-[17px] text-ink/60">{desc}</p>
		</div>
	);
}

export function Engineering() {
	return (
		<section className="px-4 py-[60px] sm:px-20">
			<div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-2xl border border-line bg-surface-2">
				<div className="dots pointer-events-none absolute inset-x-0 top-0 h-[170px] text-ink/25 [mask-image:radial-gradient(ellipse_55%_100%_at_15%_0%,#000,transparent)]" />
				<div className="dots pointer-events-none absolute bottom-0 right-0 h-[120px] w-[560px] text-ink/20 [mask-image:radial-gradient(ellipse_80%_100%_at_100%_100%,#000,transparent)]" />

				<div className="relative flex flex-col gap-6 px-6 pt-16 sm:px-14 sm:pt-[88px] md:flex-row md:justify-between">
					<div>
						<h2 className="text-[36px] font-light leading-[1.1] tracking-[-0.055em] sm:text-[44px]">
							How we ship.
						</h2>
					</div>
					<p className="max-w-[300px] text-[13px] leading-[19px] text-ink/60 md:mt-3">
						Agents write the code. We decide what to build and review every change.
					</p>
				</div>

				<div className="relative mx-4 mt-12 grid border-y border-line sm:mx-10 md:grid-cols-3">
					<Step icon="◇" label="Plan with agents" desc="Tasks go on the board with context, so any agent can pick them up.">
						<div className="flex flex-col gap-2.5 rounded-[10px] border border-line bg-surface p-3">
							{TASKS.map((t) => (
								<div key={t.title} className="flex items-center gap-2.5 rounded-lg bg-surface-2 px-3 py-1.5">
									<span className={`size-2 shrink-0 rounded-full ${t.dot}`} />
									<span className="flex flex-col">
										<span className="text-xs font-medium tracking-[-0.01em]">{t.title}</span>
										<span className="font-mono text-[10px] text-ink/45">{t.agent}</span>
									</span>
								</div>
							))}
						</div>
					</Step>
					<Step icon="⬡" label="Build every layer" desc="Interface, API and data change together in one pull request.">
						<div className="absolute left-1/2 top-1/2">
							<svg viewBox="-80 -90 160 180" className="absolute -left-20 -top-[90px] h-[180px] w-40" aria-hidden>
								<path
									d="M0 -70L61 -35L61 35L0 70L-61 35L-61 -35Z"
									fill="none"
									stroke="var(--line)"
									strokeWidth="1.5"
									strokeDasharray="3 4"
								/>
							</svg>
							{LAYERS.map(([l, x, y]) => (
								<span
									key={l}
									className="absolute grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[10px] border border-line bg-surface font-mono text-[9px] font-medium text-ink/70"
									style={{ left: x, top: y }}
								>
									{l}
								</span>
							))}
							<span className="absolute -translate-x-1/2 -translate-y-1/2">
								<LogoTile className="size-12 rounded-[14px]" />
							</span>
						</div>
					</Step>
					<Step icon="△" label="Run what we ship" desc="We deploy, monitor and keep our own products running.">
						<div className="flex flex-col gap-5 rounded-[10px] border border-line bg-surface px-4 py-[18px]">
							{SERVICES.map((s) => (
								<div key={s.name} className="flex items-center justify-between font-mono text-xs">
									<span className="text-ink/80">{s.name}</span>
									<span className={`flex items-center gap-1.5 text-[11px] ${s.tone}`}>
										<span className={`size-[7px] rounded-full ${s.dot}`} />
										{s.state}
									</span>
								</div>
							))}
						</div>
					</Step>
				</div>

				<div className="relative flex flex-col gap-8 px-6 pb-14 pt-10 sm:px-14 md:flex-row md:items-start md:justify-between">
					<div>
						<p className="font-mono text-[11px] tracking-[0.27em] text-ink/50">AI-NATIVE PRODUCT STUDIO</p>
						<p className="mt-4 max-w-[640px] text-xl leading-[1.35] tracking-[-0.05em] sm:text-2xl">
							Every product starts from Starter, so CI, docs and the shared UI are there on day one.
						</p>
					</div>
					<Image
						src="/shots/starter.webp"
						alt="Starter website"
						width={480}
						height={300}
						className="w-[240px] shrink-0 rounded-[10px]"
					/>
				</div>
			</div>
		</section>
	);
}
