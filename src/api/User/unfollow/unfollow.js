import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        unfollow: async(_, args, { request }) => {
            //첫번째 인자는 사용하지 않는 args, 두번째 인자는 arguments, 세번째 인자는 context
            isAuthenticated(request);
            const { id } = args;
            const { user } = request;
            try {
                await prisma.updateUser({
                    where: {
                        id: user.id
                    },
                    data: {
                        following: {
                            disconnect: {
                                id
                            }
                        }
                    }
                });
                return true;
            } catch {
                return false;
            }
        }
    }
}