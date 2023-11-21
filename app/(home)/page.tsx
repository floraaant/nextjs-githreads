import { getAuthSession } from "@/lib/auth";
import { getLatestsPosts } from "@/src/query/post.query";
import { Post } from "@/src/feature/post/post";
import React from "react";

export default async function Home() {
    const session = await getAuthSession();
    const posts = await getLatestsPosts();

    return (<div>
        {posts.map(p => (
        <Post post={p} key={p.id} />
        ))}
    </div>);
}