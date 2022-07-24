import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-jwt";
import {AccessTokenDto, JwtPayload} from "../auth.dto";
import {Request} from 'express';
import {Injectable, UnauthorizedException} from "@nestjs/common";
const ExtractJwt = require('passport-jwt').ExtractJwt;

@Injectable()
export class RtStrategy extends  PassportStrategy(Strategy, "rt-token") {
    constructor(
        ) {
        super({
            secretOrKey: 'CharlieShin',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true
        });
    }

    async validate(req: Request, payload: JwtPayload) {
        const refreshToken = req.get('authorization').replace("Bearer", "").trim();
        return {
            ...payload,
            refreshToken
        }
    }
}
