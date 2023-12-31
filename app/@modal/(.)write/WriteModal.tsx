"use client"

import { createPost } from "@/app/write/write-post.action";
import { WritePostForm, WritePostFormValues } from "@/app/write/writePostForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation"
import React from "react"

export const WriteModal = ({user, createPost}: {
    user: User;
    createPost: (values: WritePostFormValues) => Promise<string>
}) => {
    const router = useRouter();
    const pathname = usePathname();

    return(
        <Dialog open={pathname == "/write"} onOpenChange={() => {
            router.back();
        }}>
            <DialogContent>
                <WritePostForm user={user} onSubmit={createPost}/>
            </DialogContent>
        </Dialog>
    )
}
