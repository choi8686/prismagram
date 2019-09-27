

import { prisma } from "../../../../generated/prisma-client";
import { COMMENT_FRAGMENT } from "../../../fragments";

export default {
    Query: {
        seeFullPost: async(_, args) => {
            const id = args;
            //post, comments, likeCount
            const post = await prisma.post({ id });
            const comments = await prisma
              .post({ id })
              .comments()
              .$fragment(COMMENT_FRAGMENT);
            const likeCount = await prisma //like counter
              .likesConnection({
                  where: { post: { id }}
              })
              .aggregate() //집합 
              .count();
            return {
                post,
                comments,
                likeCount
            }
        }
    }
}