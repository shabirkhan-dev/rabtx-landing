import { ImageResponse } from "next/og";
import { formatPostDate, getPost, getPosts } from "@/lib/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "A RabtX post";

/** src/app/icon.svg, embedded so the image needs no file access at request time. */
const ICON = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTcuOSIgZmlsbD0iIzJEN0NGNiIvPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE3LjI4IDE4LjkyKSBzY2FsZSgxLjYzNTYpIiBmaWxsPSIjZmZmIj48cGF0aCBkPSJNMTcuNzY1NCAxNS45MTM1QzE3Ljc3NDEgMTUuODc4OSAxNi44NCAxNC45MDU5IDE1LjYyNDkgMTMuNjgyMkMxMy4xMTI0IDExLjE1MjQgMTMuMDQ3NiAxMS4wOTE5IDEyLjk2NTQgMTEuMTQzOEMxMi43OTI0IDExLjIzODkgMTAuNjQzMyAxMy4zNzk1IDEwLjY0MzMgMTMuNDUzQzEwLjY0MzMgMTMuNTM5NSAxMi43NjIyIDE1LjcxNDYgMTMuMDIxNiAxNS44OTYyTDEzLjE3MyAxNkwxNS40NjQ5IDE1Ljk5MTRDMTcuNDYyNyAxNS45Nzg0IDE3Ljc1NjggMTUuOTY5NyAxNy43NjU0IDE1LjkxMzVaTTE0LjAxNjIgOS44ODk3M0MxNC44NjM4IDkuMjU4MzggMTUuNzAyNyA4LjMwNzAzIDE2LjA4MzMgNy41NDU5NUMxNi42NDk3IDYuNDA4NjUgMTYuNzI3NiA1LjAxNjIyIDE2LjMwMzggMy43NDA1NEMxNS42Mzc4IDEuNzQyNyAxMy45MDgxIDAuMzA3MDI3IDExLjg1NDEgMC4wNDMyNDM0QzExLjYwMzMgMC4wMTI5NzMyIDkuNzM5NDcgMCA1Ljg5MDgyIDAuMDA4NjQ5MzhDMC43NzUxNDQgMC4wMjE2MjI0IDAuMjkwODIxIDAuMDI1OTQ2NCAwLjI1MTkwMyAwLjA5MDgxMTNDMC4yMTczMDggMC4xNDcwMjcgMC4yMzAyOCAwLjE5MDI3IDAuMjk5NDY5IDAuMjgxMDgxQzAuNDIwNTUgMC40MzY3NTcgMi4wOTQwNiAyLjIwOTczIDIuNzc3MzEgMi45MDU5NUwzLjA2MjcxIDMuMkg3LjExNDYxQzExLjYzMzUgMy4yIDExLjUwODEgMy4xOTEzNSAxMi4wOTE5IDMuNDk4MzhDMTIuODA5NyAzLjg3MDI3IDEzLjI3NjggNC42NCAxMy4yODExIDUuNDUyOTdDMTMuMjgxMSA1Ljk2NzU3IDEzLjAyMTYgNi41MjU0MSAxMi42MDIyIDYuOTE4OTJDMTIuMjY0OSA3LjIzNDU5IDExLjkzNjIgNy40MDc1NyAxMS4zODcgNy41NTAyN0MxMC45MiA3LjY3NTY3IDEwLjgxNjIgNy43MTg5MiAxMC44MTYyIDcuNzkyNDNDMTAuODE2MiA3Ljg0ODY1IDExLjE4MzggOC4yNDIxNiAxMi40MzM1IDkuNTAwNTRMMTMuMjk4NCAxMC4zNzg0TDEzLjQ0OTcgMTAuMjg3NkMxMy41MzYyIDEwLjIzNTcgMTMuNzg3IDEwLjA1ODQgMTQuMDE2MiA5Ljg4OTczWiIvPjxwYXRoIGQ9Ik02Ljc0MjcgMTUuOTM5NUM2Ljc5ODkyIDE1LjkwOTIgOC4wMzEzNSAxNC43MTE0IDkuNDggMTMuMjhDMTEuMjg3NiAxMS40ODk3IDEyLjExMzUgMTAuNjQ2NSAxMi4xMTM1IDEwLjU4MTZDMTIuMTEzNSAxMC40NzM1IDEyLjMyOTcgMTAuNzA3IDguMDcwMjcgNi4yOTYyMkM3LjM3ODM4IDUuNTgyNyA2Ljg0NjQ4IDUuMDYzNzggNi43NjQzMiA1LjAyOTE5QzYuNTg3MDIgNC45NTU2OCAyLjE3MTg5IDQuOTQyNyAyLjAzMzUxIDUuMDE2MjJDMS45ODE2MiA1LjA0NjQ5IDEuOTUxMzUgNS4xMDcwMyAxLjk1MTM1IDUuMTg5MTlDMS45NTEzNSA1LjI5NzMgMi4zMTAyNyA1LjY3Nzg0IDQuNDgxMDggNy44OTYyMkM1Ljg3MzUxIDkuMzE4OTIgNy4wMTA4MSAxMC40OTA4IDcuMDEwODEgMTAuNTA4MUM3LjAxMDgxIDEwLjUyNTQgNi40NjE2MiAxMS4wNzAzIDUuNzkxMzUgMTEuNzIzMkMzLjM0Mzc4IDE0LjA5MyAxLjY0ODY1IDE1Ljc1NzggMS42MjcwMiAxNS44MTg0QzEuNTU3ODQgMTYgMS41ODgxMSAxNiA0LjE3NDA1IDE2QzYuMTA3MDMgMTUuOTk1NyA2LjY2NDg2IDE1Ljk4MjcgNi43NDI3IDE1LjkzOTVaIi8+PC9nPjwvc3ZnPg==";

export async function generateStaticParams() {
	return (await getPosts()).map((post) => ({ slug: post.slug }));
}

/** A post's share image: the RabtX tile, the post title and standfirst, and the byline. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const post = await getPost(slug);

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				padding: 72,
				background: "#efefef",
				color: "#161616",
			}}
		>
			<div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 28, color: "#555" }}>
				<img src={ICON} width={56} height={56} alt="" />
				<span style={{ fontWeight: 700, color: "#161616" }}>RabtX</span>
				<span>· Writing</span>
			</div>
			<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
				<div style={{ fontSize: 68, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>{post?.title ?? "RabtX"}</div>
				{post?.standfirst && (
					<div style={{ fontSize: 30, lineHeight: 1.35, color: "#555", maxWidth: 1000 }}>{post.standfirst}</div>
				)}
			</div>
			<div style={{ display: "flex", fontSize: 26, color: "#555" }}>
				Shabir Khan{post ? ` · ${formatPostDate(post.publishedAt)}` : ""} · rabtx.dev
			</div>
		</div>,
		size,
	);
}
