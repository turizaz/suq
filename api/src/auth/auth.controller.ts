import {Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards} from "@nestjs/common";
import {AccessTokenDto, AuthCredentialDto} from "./auth.dto";
import {AuthService} from "./auth.service";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "./get-user.decorator";
import {UserEntity} from "../users/user.entity";
import {UpdateResult} from "typeorm";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }
    @Post("sign-up")
    @HttpCode(HttpStatus.CREATED)
    signUp(@Body() credentialDto:AuthCredentialDto): Promise<AccessTokenDto> {
        return this.authService.signUp(credentialDto);
    }

    @Post("sign-in")
    @HttpCode(HttpStatus.OK)
    signIn(@Body() credentialDto:AuthCredentialDto): Promise<AccessTokenDto> {
        return this.authService.signIn(credentialDto);
    }

    @Post("logout")
    @UseGuards(AuthGuard())
    @HttpCode(HttpStatus.OK)
    logout(@GetUser() user: UserEntity) {
        this.authService.logout(user);
    }

    @Post("refresh")
    @UseGuards(AuthGuard("rt-token"))
    @HttpCode(HttpStatus.OK)
    refresh(@GetUser() user: UserEntity): Promise<AccessTokenDto> {
       return this.authService.refreshToken(user);
    }

    @Post("test")
    @UseGuards(AuthGuard("at-token"))
    @HttpCode(HttpStatus.OK)
    test(@Req() req, @GetUser() user: UserEntity) {
        console.log(user);
    }
}
