import { isAuthenticated } from "../../middlewares"
import { prisma } from "../../../generated/prisma-client"

export default {
    Mutation: {
        addComment: (_, args, { request }) => {
            isAuthenticated(request); //for authentication
            const { text, postId } = args; // args that write comments
            const { user } = request; // request includes user information 
            const comment = prisma.createComment({
                user: {
                    connect: {
                        id: user.id 
                    }
                },
                post: {
                    connect: {
                        id: postId
                    }
                },
                text
            });
            return comment;
        }
    }
}