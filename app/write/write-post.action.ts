"use server";

import { getUser } from "@/src/query/user.query";
import { WritePostFormValues } from "./writePostForm";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createPost = async (values: WritePostFormValues) => {
    const user = await getUser();

    const post = await prisma.post.create({
        data:{
            content: values.content,
            userId: user.id,
        },
    })
    revalidatePath(`/posts/${post.id}`);
    return post.id;
}