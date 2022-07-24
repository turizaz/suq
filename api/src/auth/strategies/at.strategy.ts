import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-jwt";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "../../users/user.repository";
import {AccessTokenDto, JwtPayload} from "../auth.dto";
import {UserEntity} from "../../users/user.entity";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {UsersService} from "../../users/users.service";
const ExtractJwt = require('passport-jwt').ExtractJwt;

@Injectable()
export class AtStrategy extends  PassportStrategy(Strategy, "at-token") {
    constructor(
        private userService: UsersService
        ) {
        super({
            secretOrKey: 'topGun',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload): Promise<UserEntity> {
        const {login} = payload;
        const user: UserEntity = await this.userService.get(login);

        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
