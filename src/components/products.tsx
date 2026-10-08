import Image from "next/image";
import type { ReactNode } from "react";
import { SectionHeader } from "./ui";

function Card({
	title,
	desc,
	className = "",
	children,
}: {
	title: string;
	desc: string;
	className?: string;
	children: ReactNode;
}) {
	return (
		<article
			className={`relative overflow-hidden rounded-[20px] border border-line bg-surface p-6 ${className}`}
		>
			<h3 className="text-[15px] font-semibold tracking-[-0.01em]">{title}</h3>
			<p className="mt-1 text-[13px] leading-[18px] text-ink/60">{desc}</p>
			{children}
		</article>
	);
}

export function Products() {
	return (
		<section id="products" className="px-4 pt-20 sm:px-20">
			<SectionHeader chip="Products" title="What we have built." sub="Designed, engineered and run by RabtX." />
			<div className="mx-auto mt-[72px] grid max-w-[1280px] gap-6 md:grid-cols-3">
				<Card
					title="Grid"
					desc="An AI-native workspace where agents take tasks from the board and open pull requests. Public beta."
					className="h-[340px] md:col-span-2 md:h-[440px]"
				>
					<Image
						src="/shots/grid.webp"
						alt="Grid board with agent tasks"
						width={1520}
						height={940}
						className="absolute left-6 top-[104px] w-[760px] max-w-none rounded-xl border border-line md:left-10"
					/>
				</Card>
				<Card title="School OS" desc="A multi-tenant platform for running schools." className="h-[340px] md:h-[440px]">
					<Image
						src="/shots/school-os.webp"
						alt="School OS attendance screen"
						width={1440}
						height={900}
						className="absolute left-6 top-[104px] w-[560px] max-w-none rounded-xl md:left-8"
					/>
				</Card>
				<Card title="Starter" desc="Our production monorepo, the base of every product." className="h-[400px]">
					<Image
						src="/shots/starter.webp"
						alt="Starter website"
						width={840}
						height={524}
						className="absolute left-6 top-[108px] w-[420px] max-w-none rounded-xl md:left-8"
					/>
				</Card>
				<Card title="Rabtx UI" desc="Web and native components on one set of tokens." className="h-[400px]">
					<div className="mt-[62px] flex gap-2">
						<span className="rounded-full bg-ink px-[18px] py-[11px] text-sm font-medium text-inv">Primary</span>
						<span className="rounded-full border border-line bg-surface px-[18px] py-[11px] text-sm font-medium">
							Secondary
						</span>
					</div>
					<div className="mt-5 flex items-center gap-3">
						<span className="relative h-6 w-11 rounded-full bg-blue">
							<span className="absolute right-0.5 top-0.5 size-5 rounded-full bg-white" />
						</span>
						<span className="text-[13px] text-ink/80">Notifications</span>
					</div>
					<div className="mt-5 h-10 w-[280px] max-w-full rounded-[10px] border border-line bg-surface-2 px-3.5 text-[13px] leading-10 text-ink/40">
						you@studio.com
					</div>
					<div className="mt-5 inline-flex gap-0.5 rounded-[10px] bg-surface-2 p-[3px] text-xs font-medium">
						<span className="rounded-lg bg-surface px-3 py-1.5">Board</span>
						<span className="px-3 py-1.5 text-ink/55">Files</span>
						<span className="px-3 py-1.5 text-ink/55">Notes</span>
					</div>
				</Card>
				<article className="relative h-[400px] rounded-[20px] border border-dashed border-ink/15 p-6">
					<h3 className="text-[15px] font-semibold tracking-[-0.01em]">More in build</h3>
					<p className="mt-1 text-[13px] leading-[18px] text-ink/60">
						The next RabtX products are in design now.
					</p>
					<div className="mt-[52px] flex flex-col gap-4">
						{[140, 110, 80].map((w, i) => (
							<div key={w} className="flex h-[60px] items-center gap-3 rounded-xl border border-dashed border-ink/15 px-3.5">
								<span className="size-8 rounded-lg bg-ink/[0.06]" />
								<span className="flex flex-col gap-2">
									<span className="h-2.5 rounded-full bg-ink/[0.08]" style={{ width: w }} />
									<span className="h-2 rounded-full bg-ink/[0.05]" style={{ width: 200 - i * 20 }} />
								</span>
							</div>
						))}
					</div>
				</article>
			</div>
		</section>
	);
}
