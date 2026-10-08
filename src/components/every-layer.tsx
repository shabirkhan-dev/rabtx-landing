import type { ReactNode } from "react";
import { AgentLogo } from "./agent-logos";
import { LogoTile } from "./logo";
import { SectionHeader } from "./ui";

function Cell({ title, desc, children }: { title: string; desc: string; children: ReactNode }) {
	return (
		<div className="flex flex-col items-center border-b border-line px-4 pb-10 text-center md:h-[360px] md:[&:nth-child(odd)]:border-r">
			<div className="relative h-[230px] w-full max-w-[360px]">{children}</div>
			<h3 className="mt-auto text-xs font-semibold tracking-[0.04em]">{title}</h3>
			<p className="mt-2.5 max-w-[440px] text-sm leading-[21px] text-ink/60">{desc}</p>
		</div>
	);
}

function Marker({ className }: { className: string }) {
	return (
		<span
			className={`absolute hidden size-[7px] -translate-x-1/2 -translate-y-1/2 rounded-[2px] border border-line bg-bg md:block ${className}`}
		/>
	);
}

export function EveryLayer() {
	return (
		<section className="pt-[70px]">
			<SectionHeader
				monoChip
				chip="WHAT WE BUILD"
				title="Every layer, one studio."
				sub="Interface, AI, infrastructure and design, built by the same team and shipped as one product."
			/>
			<div className="relative mx-auto mt-20 max-w-[1280px] border-t border-line md:mx-20 xl:mx-auto">
				{/* lines run past the grid like the reference */}
				<span className="absolute -inset-x-10 top-1/2 hidden h-px bg-line md:block" />
				<span className="absolute -inset-y-10 left-1/2 hidden w-px bg-line md:block" />
				<span className="absolute -inset-y-10 left-0 hidden w-px bg-line md:block" />
				<span className="absolute -inset-y-10 right-0 hidden w-px bg-line md:block" />
				{["left-0", "left-1/2", "left-full"].flatMap((x) =>
					["top-0", "top-1/2", "top-full"].map((y) => <Marker key={x + y} className={`${x} ${y}`} />),
				)}
				<div className="grid md:grid-cols-2">
					<Cell
						title="AI-NATIVE BY DEFAULT"
						desc="Models, agents and retrieval sit in the core of every product, with evaluation built in, not added on later."
					>
						<div className="absolute left-1/2 top-[54px] h-[104px] w-[300px] -translate-x-1/2 rounded-[14px] border-[1.5px] border-blue bg-surface p-4 text-left">
							<p className="text-[13px] text-ink/55">Add a task for an agent…</p>
							<span className="absolute bottom-3 left-3 grid size-6 place-items-center rounded-[7px] border border-line text-sm text-ink/60">
								+
							</span>
							<span className="absolute bottom-3 right-3 grid size-6 place-items-center rounded-[7px] bg-blue text-[13px] font-semibold text-white">
								↑
							</span>
						</div>
						<div className="absolute inset-x-0 top-[172px] flex justify-center gap-1.5">
							{["board.tsx", "runner.ts", "schema.sql"].map((f) => (
								<span
									key={f}
									className="rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-[11px] text-ink/75"
								>
									{f}
								</span>
							))}
						</div>
					</Cell>
					<Cell
						title="DESIGN AND CODE TOGETHER"
						desc="One set of tokens drives Figma and the codebase, so what is designed is exactly what ships."
					>
						<pre className="absolute left-6 top-[56px] font-mono text-xs leading-[22px] text-code">
							{[
								"export const tokens = {",
								"  radius: { control: 10 },",
								"  color: { accent: '#2D7CF6' },",
								"  space: [4, 8, 12, 16, 24],",
								"}",
							].map((l, i) => (
								<div key={l} className="flex gap-3">
									<span className="text-ink/30">{i + 1}</span>
									<span>
										{i === 2 ? (
											<>
												{"  color: { accent: "}
												<span className="text-blue">&apos;#2D7CF6&apos;</span>
												{" },"}
											</>
										) : (
											l
										)}
									</span>
								</div>
							))}
						</pre>
						<CursorTag name="Shabir" className="left-[248px] top-[62px] bg-blue" />
						<CursorTag name="Claude" className="left-[266px] top-[128px] bg-claude" />
					</Cell>
					<Cell
						title="WORKS WITH YOUR AGENTS"
						desc="Claude Code, Codex, opencode and Antigravity run side by side. No product is tied to one AI provider."
					>
						<svg viewBox="0 0 360 230" className="absolute inset-0 size-full" aria-hidden>
							<defs>
								<radialGradient id="arc-glow" cx="0.5" cy="1" r="0.6">
									<stop offset="0" stopColor="#2D7CF6" stopOpacity="0.28" />
									<stop offset="1" stopColor="#2D7CF6" stopOpacity="0" />
								</radialGradient>
							</defs>
							<path d="M0 230A180 180 0 0 1 360 230Z" fill="url(#arc-glow)" />
							<path
								d="M0 230A180 180 0 0 1 360 230"
								fill="none"
								stroke="currentColor"
								strokeOpacity="0.18"
								strokeDasharray="3 4"
							/>
						</svg>
						{(
							[
								["claude", 21, 170],
								["codex", 89, 96],
								["opencode", 271, 96],
								["antigravity", 339, 170],
							] as const
						).map(([id, x, y]) => (
							<span
								key={id}
								className="absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface"
								style={{ left: x, top: y }}
							>
								<AgentLogo id={id} className="size-[22px]" />
							</span>
						))}
						<span className="absolute left-[180px] top-[62px] -translate-x-1/2 -translate-y-1/2">
							<LogoTile className="size-[52px] rounded-[16px]" />
						</span>
					</Cell>
					<Cell
						title="BUILT TO BE OWNED"
						desc="Products run on your own machine or server. Your code, data and keys stay with you."
					>
						<pre className="absolute left-1/2 top-12 -translate-x-1/2 font-mono text-xs leading-[26px] text-ink/10">
							{`import { db } from "@grid/db";\n    const keys = vault.local();\nrunner.start({ host: "self" });\n    audit.log(session.id);\nexport default app;`}
						</pre>
						<svg viewBox="0 0 260 230" className="absolute left-1/2 top-0 h-[230px] -translate-x-1/2" aria-hidden>
							<defs>
								<linearGradient id="shield-s" x1="0" y1="0" x2="0" y2="1">
									<stop offset="0" stopColor="#2D7CF6" />
									<stop offset="1" stopColor="#7A9DFF" stopOpacity="0.4" />
								</linearGradient>
								<radialGradient id="shield-g" cx="0.5" cy="0.45" r="0.5">
									<stop offset="0" stopColor="#2D7CF6" stopOpacity="0.22" />
									<stop offset="1" stopColor="#2D7CF6" stopOpacity="0" />
								</radialGradient>
							</defs>
							<circle cx="130" cy="112" r="110" fill="url(#shield-g)" />
							<path
								d="M130 40L190 64V112C190 150 164 176 130 188C96 176 70 150 70 112V64Z"
								fill="var(--surface)"
								stroke="url(#shield-s)"
								strokeWidth="3"
							/>
							<path
								d="M130 62L172 79V112C172 139 154 157 130 166C106 157 88 139 88 112V79Z"
								fill="var(--surface-2)"
								stroke="var(--line)"
							/>
						</svg>
					</Cell>
				</div>
			</div>
		</section>
	);
}

function CursorTag({ name, className }: { name: string; className: string }) {
	return (
		<span className={`absolute ${className} rounded-full px-2 py-0.5 text-[11px] font-semibold text-white`}>
			{name}
			<span className={`absolute -left-[3px] top-[20px] h-[18px] w-[1.5px] ${className.split(" ").at(-1)}`} />
		</span>
	);
}
