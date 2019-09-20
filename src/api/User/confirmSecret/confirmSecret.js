import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils"

export default {
    Mutation: {
        confirmSecret: async(_, args) => {
   
            const {email, secret} = args; //email과 secret words를 args로 받음.
            const user = await prisma.user({email}); 
            if(user.loginSecret === secret){ 

                return generateToken(user.id) //email과 secret words가 맞으면 토큰생성
                
            } else {
                throw Error("Wrong email/secret combination");
            }
        }
    }
}