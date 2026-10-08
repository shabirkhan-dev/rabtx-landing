"use client";

import { useState } from "react";
import { AGENTS, AgentLogo, type AgentId } from "./agent-logos";

const CLI: Record<AgentId, string> = {
	claude: "claude-code",
	codex: "codex",
	opencode: "opencode",
	antigravity: "antigravity",
};

// Tile centres for the four 48px tabs with 20px gaps; wires meet at the middle.
const CENTERS = [24, 92, 160, 228];

export function Quickstart() {
	const [agent, setAgent] = useState<AgentId>("claude");
	const active = AGENTS.find((a) => a.id === agent) ?? AGENTS[0];
	const lines: [string, string][] = [
		["$ ", "bun install"],
		["$ ", "bun run build"],
		["$ ", "bun run start"],
		["", ""],
		["✓ ", "console   ready on your machine"],
		["✓ ", `runner    ${CLI[agent]} detected`],
		["✓ ", "board     agents can take tasks"],
	];

	return (
		<section className="flex flex-col items-center px-4 pb-20 pt-24 text-center">
			<h2 className="text-[28px] font-medium tracking-[-0.045em] sm:text-[32px]">Grid runs on your machine.</h2>
			<p className="mt-3 max-w-[460px] text-sm leading-5 text-ink/60">
				Pick the agent you already use. Grid runs it in its own environment and keeps every change on the board
				for review.
			</p>

			<div className="mt-[70px] flex gap-5" role="tablist" aria-label="Agent">
				{AGENTS.map((a) => {
					const on = a.id === agent;
					return (
						<button
							key={a.id}
							type="button"
							role="tab"
							aria-selected={on}
							aria-label={a.name}
							onClick={() => setAgent(a.id)}
							className={`grid size-12 place-items-center rounded-xl border bg-surface transition-colors ${
								on ? "border-claude/80 bg-claude/10" : "border-line hover:border-ink/25"
							}`}
						>
							<AgentLogo id={a.id} className="size-6" />
						</button>
					);
				})}
			</div>
			<svg viewBox="0 0 252 80" className="h-20 w-[252px]" aria-hidden>
				{CENTERS.map((x, i) => {
					const on = AGENTS[i].id === agent;
					return (
						<path
							key={x}
							d={`M${x} 0V30H126V80`}
							fill="none"
							stroke={on ? "#D97757" : "var(--line)"}
							strokeWidth={on ? 1.2 : 1.5}
						/>
					);
				})}
			</svg>

			<div className="w-full max-w-[640px] overflow-hidden rounded-xl border border-line bg-surface text-left">
				<div className="flex h-[42px] items-center gap-[5px] border-b border-line px-4">
					<span className="size-[9px] rounded-full bg-[#FF5F57]" />
					<span className="size-[9px] rounded-full bg-[#FEBC2E]" />
					<span className="size-[9px] rounded-full bg-[#28C840]" />
					<span className="ml-6 font-mono text-[10px] uppercase tracking-[0.1em] text-ink/50">{active.name}</span>
				</div>
				<p className="px-4 pt-3 font-mono text-[11px] text-ink/50">▤ terminal</p>
				<pre className="m-3 overflow-x-auto rounded-lg bg-surface-2 py-3.5 font-mono text-xs leading-[30px] text-code">
					{lines.map(([p, l], i) => (
						<div key={i} className="flex gap-5 px-4">
							<span className="w-3 text-ink/30">{i + 1}</span>
							<span>
								<span className={p.startsWith("$") ? "text-claude" : "text-live"}>{p}</span>
								{l}
							</span>
						</div>
					))}
				</pre>
			</div>
		</section>
	);
}
