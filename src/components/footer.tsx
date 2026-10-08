import { LogoTile, Mark, Wordmark } from "./logo";
import { Pill } from "./ui";

const LINKS = [
	["Products", "#products"],
	["Writing", "#writing"],
	["LinkedIn", "https://www.linkedin.com/"],
	["GitHub", "https://github.com/"],
	["Email", "mailto:"],
];

export function Footer() {
	return (
		<footer id="contact" className="mx-4 border-t border-line sm:mx-20">
			<div className="flex flex-col items-center pb-[130px] pt-16 text-center">
				<Mark className="w-[120px] text-faded" />
				<h2 className="mt-5 text-[40px] font-bold leading-none tracking-[-0.04em] sm:text-[56px]">
					Let&rsquo;s build something
					<br />
					AI-native.
				</h2>
				<p className="mt-[18px] text-[17px] leading-6 text-ink/60">Tell us what you are building.</p>
				<div className="mt-[38px] flex flex-wrap justify-center gap-1.5">
					<Pill href="mailto:">Start a project</Pill>
					<Pill href="#products" variant="secondary">
						See our products
					</Pill>
				</div>
			</div>
			<div className="flex flex-col items-center gap-5 border-t border-line py-8 sm:flex-row sm:justify-between sm:py-[34px]">
				<a href="#" className="flex items-center gap-2 text-ink" aria-label="RabtX home">
					<LogoTile className="size-7 rounded-lg" />
					<Wordmark className="h-4" />
				</a>
				<nav className="flex flex-wrap justify-center gap-6 text-sm font-medium text-ink/60" aria-label="Footer">
					{LINKS.map(([label, href]) => (
						<a key={label} href={href} className="hover:text-ink">
							{label}
						</a>
					))}
				</nav>
				<p className="text-sm text-ink/60">© 2026 RabtX</p>
			</div>
		</footer>
	);
}
