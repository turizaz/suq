import {ConflictException, Injectable, InternalServerErrorException, UnauthorizedException} from "@nestjs/common";
import {AccessTokenDto, AuthCredentialDto} from "./auth.dto";
import {Errors} from "../errors";
import * as bcrypt from "bcrypt";
import {JwtService} from "@nestjs/jwt";
import {UserEntity} from "../users/user.entity";
import {UsersService} from "../users/users.service";
import {UpdateResult} from "typeorm";
@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {
    }

    async signIn(authCredentialDto:AuthCredentialDto): Promise<AccessTokenDto> {
        const {login, password} = authCredentialDto;
        const user = await this.userService.get(login);
        const { refreshToken } = await this.genTokens(user);
        await this.userService.saveRt(user, refreshToken);
        if(!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Please check your credentials');
        }

        return this.genTokens(user);
    }

    async signUp(authCredentialDto:AuthCredentialDto): Promise<AccessTokenDto> {
        const {login, password} = authCredentialDto;
        try {
            const user = await this.userService.save(login, password);
            const tokens = await this.genTokens(user);
            await this.userService.saveRt(user, tokens.refreshToken);
            return tokens;
        } catch (e) {
            if(e.code === '23505') {
                throw new ConflictException(Errors.duplicateLogin);
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    logout(user: UserEntity) {
        return this.userService.removeRt(user);
    }

    async refreshToken(user: UserEntity): Promise<AccessTokenDto> {
        const tokens = await this.genTokens(user);
        await this.userService.refreshToken(user, tokens);
        return tokens;
    }

    private async genTokens(user: UserEntity) {
        const payload = {login: user.login};
        const atPromise = this.jwtService.signAsync({...payload}, {
            secret: "topGun",
            expiresIn: "10s"
        });
        const rtPromise = this.jwtService.signAsync({...payload}, {
            secret: "CharlieShin",
            expiresIn: "7d"
        });
        const [at, rt] = await Promise.all([atPromise, rtPromise]);
        return {
            accessToken: at,
            refreshToken: rt,
        };
    }
}
