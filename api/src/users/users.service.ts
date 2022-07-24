import { Injectable } from '@nestjs/common';
import {UserEntity} from "./user.entity";
import {UserRepository} from "./user.repository";
import * as bcrypt from "bcrypt";
import {UpdateResult} from "typeorm";

@Injectable()
export class UsersService {
    constructor(private userRepository: UserRepository) {
    }

    public get(login: string): Promise<UserEntity> {
        return this.userRepository.findOne({login});
    }

    public async save(login: string, password: string): Promise<UserEntity> {
        const hashedPassword = await this.hashPassword(password);
        return this.userRepository.saveUser(login, hashedPassword);
    }

    async refreshToken(user: UserEntity, tokens): Promise<UserEntity> {
        return new Promise((res, rej) => {res(null)})
        return this.userRepository.updateRt(user.login, tokens.refreshToken);
    }

    public async saveRt(user: UserEntity, refreshToken: string): Promise<UserEntity> {
        return this.userRepository
            .updateRt(refreshToken, user.login,);
    }

    public async removeRt(user: UserEntity): Promise<UserEntity> {
        return this.userRepository.removeRt(user);
    }

    public async hashPassword(password:string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(password, salt);
    }
}
