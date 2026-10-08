import type { ReactNode } from "react";
import { LogoTile, Mark } from "./logo";
import { Pill } from "./ui";

const PRODUCT_ICONS: Record<string, ReactNode> = {
	Grid: <path d="M2 2h7v7H2zM11 2h7v7h-7zM2 11h7v7H2zM11 11h7v7h-7z" />,
	"School OS": (
		<>
			<path d="M10 2L19 6.5L10 11L1 6.5Z" />
			<path d="M4.5 9.2V14c0 1.6 2.5 3.4 5.5 3.4s5.5-1.8 5.5-3.4V9.2L10 12z" />
		</>
	),
	Starter: (
		<>
			<path d="M10 1.5L18.5 6L10 10.5L1.5 6Z" />
			<path d="M1.5 9.5L10 14L18.5 9.5V12.5L10 17L1.5 12.5Z" />
		</>
	),
	"Rabtx UI": (
		<>
			<circle cx="6.5" cy="6.5" r="5" />
			<rect x="8.5" y="8.5" width="10" height="10" rx="2.5" />
		</>
	),
};

/** Floating nav: logo tile, a links pill and the call-to-action pill. */
export function Nav() {
	return (
		<header className="fixed inset-x-0 top-[15px] z-50 flex justify-center px-4">
			<nav className="flex items-center gap-2" aria-label="Main">
				<a href="#" aria-label="RabtX home">
					<LogoTile />
				</a>
				<div className="flex h-[42px] items-center gap-4 rounded-full bg-surface px-4 text-[13px] font-medium text-ink/60">
					<a href="#products" className="hover:text-ink">
						Products
					</a>
					<a href="#writing" className="hover:text-ink">
						Writing
					</a>
				</div>
				<Pill href="#contact" variant="secondary" size="sm">
					Start a project
				</Pill>
			</nav>
		</header>
	);
}

export function Hero() {
	return (
		<section className="flex flex-col items-center px-4 pb-14 pt-[120px] text-center">
			<Mark className="w-[120px] text-faded" />
			<p className="relative -mt-[29px] inline-flex items-center gap-2.5 rounded-full bg-surface py-2 pl-3 pr-3.5 text-[13px] font-medium text-ink/65">
				<span className="size-2 rounded-full bg-live" />
				Grid public beta is live
			</p>
			<h1 className="mt-3.5 text-[40px] font-bold leading-none tracking-[-0.04em] sm:text-[56px]">
				A studio building
				<br />
				AI-native products,
				<br />
				full-stack.
			</h1>
			<p className="mt-[18px] max-w-[420px] text-[17px] leading-6 text-ink/60">
				We design, engineer and run our own products, from the interface to the model calls.
			</p>
			<div className="mt-[38px] flex flex-wrap justify-center gap-1.5">
				<Pill href="#contact">Start a project</Pill>
				<Pill href="#products" variant="secondary">
					See our products
				</Pill>
			</div>

			<h2 className="mt-24 text-base font-semibold tracking-[-0.01em] sm:mt-[158px]">
				Products we build and run
			</h2>
			<ul className="mt-8 flex max-w-[765px] flex-wrap items-center justify-center sm:mt-14">
				{Object.entries(PRODUCT_ICONS).map(([name, icon]) => (
					<li
						key={name}
						className="flex h-11 w-[153px] items-center justify-center gap-2 text-[22px] font-bold tracking-[-0.03em] text-word"
					>
						<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden className="size-5">
							{icon}
						</svg>
						{name}
					</li>
				))}
				<li className="flex h-11 w-[153px] items-center justify-center">
					<span className="rounded-full bg-surface px-[15px] py-[13px] text-sm font-semibold">
						More soon
					</span>
				</li>
			</ul>
		</section>
	);
}
