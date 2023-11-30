import { WritePostForm } from "@/app/write/writePostForm";
import { Post } from "@/src/feature/post/post";
import { getPost, getPostView } from "@/src/query/post.query";
import { getUser } from "@/src/query/user.query";
import { notFound } from "next/navigation";
import React from "react";
import { createPostReply } from "./write-reply.action";

export default async function PostReplu({params}:{params:{postId: string}}){
    const user = await getUser();

    const post = await getPost(params.postId);

    if(!post){
        return notFound();
    }
    return(
        
        <div>
            <Post post={post} />
            <WritePostForm 
            user={user} 
            onSubmit={async (values) => {
                'use server';
                return createPostReply(post.id, values);
              }}
            />
        </div>
    )
}