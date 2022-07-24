import {IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class AuthCredentialDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    login: string;

    @IsString()
    @MinLength(4)
    @MaxLength(32)
    password: string;
}

export interface AccessTokenDto {
    accessToken: string;
    refreshToken: string;
}

export interface JwtPayload {
    login: string;
}
