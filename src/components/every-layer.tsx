import type { ReactNode } from "react";
import { AgentLogo } from "./agent-logos";
import { LogoTile } from "./logo";
import { SectionHeader } from "./ui";

function Cell({ title, desc, children }: { title: string; desc: string; children: ReactNode }) {
	return (
		<div className="flex flex-col items-center border-b border-line px-4 pb-10 text-center md:h-[360px] md:[&:nth-child(odd)]:border-r">
			<div className="relative h-[230px] w-full max-w-[360px]">{children}</div>
			<h3 className="mt-auto text-xs font-semibold tracking-[0.04em]">{title}</h3>
			<p className="mt-2.5 max-w-[500px] text-sm leading-[21px] text-ink/60">{desc}</p>
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
		<section id="how" className="scroll-mt-24 pt-[70px]">
			<SectionHeader monoChip chip="HOW WE WORK" title="One team, from interface to infrastructure." />
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
						desc="Model calls, agents and retrieval are part of the product from day one."
					>
						<AiLayers />
					</Cell>
					<Cell
						title="DESIGN AND CODE TOGETHER"
						desc="Figma and the code share one set of design tokens."
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
						title="BUILT WITH AI AGENTS"
						desc="We build with Claude Code, Codex, opencode and Antigravity, and don’t tie any product to one provider."
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
						title="WEB, MOBILE AND API"
						desc="Next.js on the web, Expo on mobile, and typed APIs behind both."
					>
						<Platforms />
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

const AI_LAYERS = [
	["interface", "next.js · expo"],
	["model", "claude · gpt"],
	["data", "postgres · vectors"],
];

/** Interface, model and data layers threaded by one AI line, with the model layer lit. */
function AiLayers() {
	return (
		<div className="absolute left-1/2 top-[38px] w-[280px] -translate-x-1/2">
			<span className="absolute left-[21px] top-[22px] h-32 w-0.5 bg-blue" />
			<div className="flex flex-col gap-5">
				{AI_LAYERS.map(([name, meta]) => {
					const on = name === "model";
					return (
						<div
							key={name}
							className={`relative flex h-11 items-center justify-between rounded-xl px-[14px] font-mono ${
								on ? "border-[1.5px] border-blue bg-blue/10" : "border border-line bg-surface"
							}`}
						>
							<span className="flex items-center gap-[13px] text-xs font-medium">
								<span className={`size-2.5 rounded-full border-2 border-blue ${on ? "bg-blue" : "bg-surface"}`} />
								<span className={on ? "text-ink" : "text-ink/80"}>{name}</span>
							</span>
							<span className={`text-[10px] ${on ? "text-blue" : "text-ink/45"}`}>{meta}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}

/** A browser, a phone and an API panel: what the studio ships. */
function Platforms() {
	return (
		<div className="absolute left-1/2 top-12 flex -translate-x-1/2 items-start gap-4 scale-[0.72] sm:scale-100">
			<div className="mt-2.5 w-[220px] overflow-hidden rounded-[10px] border border-line bg-surface">
				<div className="flex h-[26px] items-center gap-1 border-b border-line px-2.5">
					<span className="size-[7px] rounded-full bg-[#FF5F57]" />
					<span className="size-[7px] rounded-full bg-[#FEBC2E]" />
					<span className="size-[7px] rounded-full bg-[#28C840]" />
				</div>
				<div className="flex flex-col gap-2 p-3.5 pt-[13px]">
					<span className="h-2.5 w-[120px] rounded-full bg-ink/15" />
					<span className="h-[7px] w-[170px] rounded-full bg-ink/[0.08]" />
					<span className="h-[7px] w-[150px] rounded-full bg-ink/[0.08]" />
					<span className="mt-3 flex items-center justify-between">
						<span className="h-6 w-20 rounded-md bg-blue" />
						<span className="font-mono text-[10px] text-ink/45">next.js</span>
					</span>
				</div>
			</div>
			<div className="flex flex-col items-center gap-1.5">
				<div className="flex h-40 w-[78px] flex-col gap-2 rounded-2xl border border-line bg-surface p-2.5">
					<span className="mx-auto h-[5px] w-[26px] rounded-full bg-ink/15" />
					<span className="h-[34px] rounded-md bg-ink/[0.08]" />
					<span className="h-1.5 w-[46px] rounded-full bg-ink/15" />
					<span className="h-1.5 w-9 rounded-full bg-ink/[0.08]" />
					<span className="mt-auto h-5 rounded-md bg-blue" />
				</div>
				<span className="font-mono text-[10px] text-ink/45">expo</span>
			</div>
			<div className="mt-[22px] flex w-[130px] flex-col gap-2 rounded-[10px] border border-line bg-surface-2 p-3 font-mono text-[10px]">
				<span className="text-ink/70">GET&nbsp; /students</span>
				<span className="text-ink/70">POST /attendance</span>
				<span className="text-ink/40">GET&nbsp; /health</span>
				<span className="mt-1.5 text-live">200 OK</span>
			</div>
		</div>
	);
}
