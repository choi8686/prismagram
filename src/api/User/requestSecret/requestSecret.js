import {
    generateSecret, sendSecretMail
} from "../../../utils";
import {
    prisma
} from "../../../../generated/prisma-client";

export default {
    Mutation: {
        requestSecret: async (_, args) => {
            const {
                email //email을 args로 받음
            } = args;
            const loginSecret = generateSecret(); //secret words 생성 method 호출
           
            try {
       
                await sendSecretMail(email, loginSecret) //secret words를 보낼때 필요한 args들
                await prisma.updateUser({
                    data: {
                        loginSecret
                    },
                    where: {
                        email
                    }
                });
                return true;
            } catch (error) {

                return false;
            }
        }
    }
};