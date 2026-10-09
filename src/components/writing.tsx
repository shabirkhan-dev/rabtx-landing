import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { PostList } from "./post-list";
import { SectionHeader } from "./ui";

/** The latest posts on the home page, with a link to the full list. */
export async function Writing() {
	const posts = await getPosts();
	return (
		<section id="writing" className="scroll-mt-24 px-4 pt-28 sm:px-20">
			<SectionHeader chip="Writing" title="Notes from building." />
			<div className="mx-auto mt-16 max-w-[880px]">
				<PostList posts={posts.slice(0, 3)} />
				<Link href="/writing" className="mt-6 inline-flex text-sm font-semibold text-ink hover:text-accent-ink">
					All writing →
				</Link>
			</div>
		</section>
	);
}
