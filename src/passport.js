//passport는 인증 관련한 일을 한다. jwt 토큰이나 쿠키에서 정보를 가져와서 사용자 정보에 serialize(저장)한다.
//토큰에서 정보를 가져와서 해독한 후에 사용자 객체를 exporess의 request에 추가해준다.



import passport from "passport" 
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //Authorization 헤더에서 jwt를 찾는 역할을 함.
    secretOrKey: process.env.JWT_SECRET
}

//middleware 

const verifyUser = async (payload, done) => {
    try{
        const user = await prisma.user({id: payload.id}); 
        //Passport gets jwt from Auth header and decodes it.
        if(user !== null){ 
            return done(null, user);
        } else {
            return done(null, false);
        }
        
    }
    
    catch(error){
        return done(error, false);
    }
}

export const authenticateJwt = (req, res, next) => {
    passport.authenticate("jwt", {sessions: false}, (error, user) => {
     
        if(user){
            req.user = user;
        }
        next();
    })(req, res, next);

}

passport.use(new Strategy(jwtOptions, verifyUser))
passport.initialize()