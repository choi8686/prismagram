

/*기존 모델에 생성하지 않은 속성이 존재할 때 추가해줘야 하는 경우가 있다. 
예를 들어, User 모델에서 FirstName과 LastName을 이용해서 FullName을 만들어야 하는 경우다.
이럴 때 해당 Model에 Computed를 만들어서 필요한 것을 정의한다. */ 
import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        posts: ({ id }) => prisma.user({ id }).posts(),
        following: ({ id }) => prisma.user({ id }).following(),
        followers: ({ id }) => prisma.user({ id }).followers(),
        likes: ({ id }) => prisma.user({ id }).likes(),
        comments: ({ id }) => prisma.user({ id }).comments(),
        rooms: ({ id }) => prisma.user({ id }).rooms(),
        followingCount: ({ id }) => 
        prisma
        .usersConnection({ where: { followers_some: { id } } })
        .aggregate()
        .count(),
    followersCount: ({ id }) =>
      prisma
        .usersConnection({ where: { following_none: { id } } })
        .aggregate()
        .count(),
        fullName: parent => {
            return `${parent.firstName} ${parent.lastName}`;
            
        },
        isFollowing: async (parent, _, { request }) => {
            //parent는 현재 Model을 호출한 객체
            const { user } = request;
            const { id: parentId } = parent;
            try{
                return prisma.$exists.user({
                    AND: [
                        {
                            id: user.id // 팔로잉하려는 사람의 ID가 존재하면서
                        },
                        {
                            following_some: {
                                id: parentId // 그사람의 팔로워에 내가 있는가?
                            }
                        }
                    ]
                });
            } catch{
                return false;
            }
        },
        isSelf: (parent, _, { request }) => {
            //check myself
            const { user } = request; // 현재 로그인한 유저 정보
            const {id: parentId } = parent; //User를 호출한 Query
            return user.id === parentId;
        }
    }
};

