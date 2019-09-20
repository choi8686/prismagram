import { isAuthenticated } from "../../../middlewares"
import { prisma } from "../../../../generated/prisma-client"

export default {
    Mutation: {
        toggleLike: async(_, args, { request }) => { //Request for use "user"
            isAuthenticated(request);
            const { postId } = args; // Receive postId by query args
            const { user } = request; // Request uses "user"
            const filterOptions = {
                AND: [{
                    user: {
                        id: user.id
                    },
                    post: {
                        id: postId
                    }
                }]
            };
            try{
                const existingLike = await prisma.$exists.like(filterOptions); //Check for Like on this Post.
                if(existingLike){
                    await prisma.deleteManyLikes(filterOptions); //If exist, delete Like.
                } else {
                    await prisma.createLike({ //If not exist, create Like.
                        user: {
                            connect: { 
                                id: user.id //connect postId to userId who give Like. (Join)
                            }
                        }
                    })
                }
                return true;
            } catch{
                return false;
            }
        }
    }
}