import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, EMAIL } from "@/components/footer";
import { Nav } from "@/components/hero";
import { PostBody } from "@/components/post-body";
import { formatPostDate, getPost, getPosts } from "@/lib/posts";
import { PRODUCTS } from "@/lib/products";
import { breadcrumbs, FOUNDER_ID, JsonLd, ORGANIZATION_ID } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
	return (await getPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: PageProps<"/writing/[slug]">): Promise<Metadata> {
	const { slug } = await props.params;
	const post = await getPost(slug);
	if (!post) return {};
	return {
		title: `${post.title} — RabtX`,
		description: post.standfirst,
		alternates: { canonical: `/writing/${post.slug}` },
		openGraph: {
			title: post.title,
			description: post.standfirst,
			type: "article",
			url: `/writing/${post.slug}`,
			siteName: "RabtX",
			publishedTime: post.publishedAt,
		},
		twitter: { card: "summary_large_image", title: post.title, description: post.standfirst },
	};
}

export default async function PostPage(props: PageProps<"/writing/[slug]">) {
	const { slug } = await props.params;
	const post = await getPost(slug);
	if (!post) notFound();

	const url = `${SITE_URL}/writing/${post.slug}`;
	const article = {
		"@type": "BlogPosting",
		headline: post.title,
		description: post.standfirst,
		datePublished: post.publishedAt,
		url,
		mainEntityOfPage: url,
		image: `${url}/opengraph-image`,
		author: { "@id": FOUNDER_ID },
		publisher: { "@id": ORGANIZATION_ID },
	};
	const trail = breadcrumbs([
		["Home", "/"],
		["Writing", "/writing"],
		[post.title, `/writing/${post.slug}`],
	]);
	const related = PRODUCTS.filter((p) => p.posts.includes(post.slug));

	return (
		<>
			<Nav />
			<main className="mx-auto max-w-[680px] px-4 pb-24 pt-[120px] sm:pt-[150px]">
				<Link href="/writing" className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink">
					<svg viewBox="0 0 16 16" aria-hidden className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5">
						<path strokeLinecap="round" strokeLinejoin="round" d="M10 3.5L5.5 8l4.5 4.5" />
					</svg>
					All writing
				</Link>
				<JsonLd nodes={[article, trail]} />
				<article className="mt-10">
					<header className="border-b border-line pb-10">
						<p className="font-mono text-xs text-subtle">
							<time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time> · {post.readingTime} ·{" "}
							<Link href="/#about" rel="author" className="hover:text-ink">
								Shabir Khan
							</Link>
						</p>
						<h1 className="mt-4 text-[32px] font-bold leading-[1.1] tracking-[-0.035em] sm:text-[44px]">{post.title}</h1>
						<p className="mt-4 text-lg leading-7 text-muted">{post.standfirst}</p>
					</header>
					<div className="pt-10">
						<PostBody markdown={post.body} />
					</div>
				</article>
				{related.length > 0 && (
					<aside className="mt-12 border-t border-line pt-8">
						<h2 className="text-sm font-semibold text-subtle">Built with this</h2>
						<ul className="mt-3 flex flex-col gap-2">
							{related.map((p) => (
								<li key={p.slug}>
									<Link href={`/products/${p.slug}`} className="text-[17px] font-semibold hover:text-accent-ink">
										{p.name}
									</Link>{" "}
									<span className="text-muted">— {p.desc}</span>
								</li>
							))}
						</ul>
					</aside>
				)}
				<a
					href={`${EMAIL}?subject=${encodeURIComponent(post.title)}`}
					className="mt-12 inline-flex h-[42px] items-center rounded-full bg-ink px-5 text-sm font-semibold text-inv transition-opacity hover:opacity-85"
				>
					Talk to us about this
				</a>
			</main>
			<Footer />
		</>
	);
}
