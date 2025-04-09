import { User, Post } from "@prisma/client";
import { db } from "../db"

export async function setWatched(user: User, post: Post) {

    const record = await db.watched.findUnique({
        where: {
            userId_postId: {
            userId: user.id,
            postId: post.id
            }
        }
    })
    if(!record) {
        await db.watched.create({
            data: {
                user: { connect: { id: user.id } },
                post: { connect: { id: post.id } }
            }
        })
        return true;
    } else {
        await db.watched.update({
            where: {
                userId_postId: {
                    userId: user.id,
                    postId: post.id
                }
            },
            data: {
                count: {
                    increment: 1
                }
            }

        })
    }
  
   return false;
  }

