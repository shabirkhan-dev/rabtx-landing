---
title: "One blog, two sites"
slug: one-blog-two-sites
excerpt: "Writing a post once and showing it on a studio site and a portfolio without Google seeing double"
standfirst: "I had the same three posts on two sites. Google only ever ranks one copy, so I picked a home for them and let the other site follow."
order: 0
publishedAt: 2026-10-09
---

::lead I publish on two sites: rabtx.dev for the studio and my portfolio for me. For a while both carried the same three posts, word for word, and each page told search engines it was the original. That is the worst of both: twice the work to keep them in sync, and Google quietly picks one copy and ignores the other.

## Pick one home

The fix starts with a decision, not code. A post has one address that counts. Mine now live on rabtx.dev, because that is where people come to hire the studio and where search traffic does the most good. They are still written in the first person and still carry my name, so the portfolio loses nothing by pointing at them.

## Let the other site follow a feed

rabtx.dev publishes an RSS feed at `/writing/feed.xml`. The portfolio reads it once a day at build time and lists each post with a link to rabtx.dev. There is no second copy to edit, so the two sites cannot drift apart.

```ts filename="posts.ts"
export async function getPosts() {
  const res = await fetch("https://rabtx.dev/writing/feed.xml", {
    next: { revalidate: 86400 },
  });
  return parseFeed(await res.text());
}
```

If the feed cannot be reached, the portfolio hides its writing section instead of failing the build. A missing list is better than a broken deploy.

## Keep the old links working

Some of the portfolio's post URLs had already been shared. Deleting them would turn every old link into a 404, so each `/blog/...` address now answers with a permanent redirect to the same post on rabtx.dev. Readers land on the right page, and search engines move the old page's standing to the new address.

## What I check after a change like this

- The feed is valid XML and lists every post, newest first.
- Each post page names itself as canonical, and only one site claims it.
- The old URLs return 308, not 404.
- The new post shows up on both sites without me touching the second one.

This post is the test of that last point. If you found it through my portfolio, it worked.
