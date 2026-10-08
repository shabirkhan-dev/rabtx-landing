import Image from "next/image";
import type { ReactNode } from "react";
import { type ProductName, ProductLogo } from "./product-logo";
import { SectionHeader } from "./ui";

function Card({
	title,
	desc,
	className = "",
	children,
}: {
	title: ProductName;
	desc: string;
	className?: string;
	children: ReactNode;
}) {
	return (
		<article
			className={`relative overflow-hidden rounded-[20px] border border-line bg-surface p-6 ${className}`}
		>
			<h3 className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.01em]">
				<ProductLogo name={title} className="size-5" />
				{title}
			</h3>
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
				<Card
					title="Starter"
					desc="Our production monorepo and the base of every RabtX product, with auth, CI, docs and tests in place."
					className="h-[400px] md:col-span-2"
				>
					<Image
						src="/shots/starter.webp"
						alt="Starter website"
						width={1520}
						height={950}
						className="absolute left-6 top-[108px] w-[760px] max-w-none rounded-xl md:left-10"
					/>
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
