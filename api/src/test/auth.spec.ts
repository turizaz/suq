import { AuthController } from '../auth/auth.controller'
import {AuthService} from "../auth/auth.service";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {AuthCredentialDto} from "../../dist/auth/auth.dto";
import {UserEntity} from "../users/user.entity";
import { v4 as uuidv4 } from 'uuid';
import * as request from 'supertest';
import {AccessTokenDto} from "../auth/auth.dto";
import {UserRepository} from "../users/user.repository";

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;
    let jwtService: JwtService;

    describe('Auth test', () => {
        it('signup', async () => {
            const userRepository = new UserRepository();
            const saveUserSpy = jest.spyOn(userRepository, "saveUser").mockImplementation(() => new Promise((res, rej) => {res(userEntity)}));
            const updateRtSpy = jest.spyOn(userRepository, "updateRt").mockImplementation(() => new Promise((res, rej) => {res(userEntity)}));
            const userService = new UsersService(userRepository);
            authService = new AuthService(userService, jwtService);
            authController = new AuthController(authService);

            const res = await userService.save("12345","12345");
            expect(saveUserSpy).toBeCalledTimes(1);
            expect(res).toBe(userEntity);
            // jest.spyOn(authService, "signUp").mockImplementation(() => new Promise((res, rej) => {res(userEntity)}));
            // const response = await authController.signUp(authCredentialDto);
            //
            // expect(saveUserSpy).toHaveBeenCalledTimes(1);
            // expect(updateRtSpy).toHaveBeenCalledTimes(1);
            // expect(saveUserSpy).toHaveBeenCalledWith(["12345","12345"]);

            // expect(response).toBe(userEntity);
        });
        it('signin', async () => {
            const response = await authController.signIn(authCredentialDto);
            expect(response).toBe(authTokensDto);
        });
    });

    beforeEach(() => {
        const userRepository = new UserRepository();
        jest.spyOn(userRepository, "saveUser").mockImplementation(() => new Promise((res, rej) => {res(userEntity)}));
        const userService = new UsersService(userRepository);
        //jest.spyOn(authService, 'signUp').mockImplementation(() => new Promise((res, rej) => {res(userEntity)}));


        // jest.spyOn(authService, 'signUp').mockImplementation(() => new Promise((res, rej) => {res(userEntity)}));
        // jest.spyOn(authService, 'signIn').mockImplementation(() => new Promise((res, rej) => {res(authTokensDto)}));
    });

    // beforeAll(() => {
    //     authCredentialDto.login = "12345";
    //     authCredentialDto.login = "password";
    //
    //     userEntity.id = uuidv4();
    //     userEntity.login = "123";
    //     userEntity.password = "123";
    //     userEntity.refreshToken = "refreshToken";
    //
    //     credDto.login = "12345";
    //     credDto.login = "password";
    // })


    const authCredentialDto = new AuthCredentialDto();
    authCredentialDto.login = "12345";
    authCredentialDto.password = "12345";

    const userEntity = new UserEntity();

    const authTokensDto = new class AuthTokensDto implements AccessTokenDto {
        accessToken: string;
        refreshToken: string;
        constructor() {
            this.accessToken = "accessToken";
            this.refreshToken = "refreshToken";
        }
    }
});
