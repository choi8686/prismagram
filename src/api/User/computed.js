/*기존 모델에 생성하지 않은 속성이 존재할 때 추가해줘야 하는 경우가 있다. 
예를 들어, User 모델에서 FirstName과 LastName을 이용해서 FullName을 만들어야 하는 경우다.
이럴 때 해당 Model에 Computed를 만들어서 필요한 것을 정의한다. */ 

import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        fullName: parent => {
            return `${parent.firstName} ${parent.lastName}`;
            
        },
        isFollowing: async (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            try{
                return prisma.$exists.user({
                    AND: [
                        {
                            id: user.id
                        },
                        {
                            following_some: {
                                id: parentId
                            }
                        }
                    ]
                });
            } catch{
                return false;
            }
        },
        isSelf: (parent, _, { request }) => {
            const { user } = request;
            const {id: parentId } = parent;
            return user.id === parentId;
        }
    }
};