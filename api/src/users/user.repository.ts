import {EntityRepository, Repository} from "typeorm";
import {UserEntity} from "./user.entity";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    saveUser(login:string, password: string): Promise<UserEntity> {
        const userEntity = this.create({
            login,
            password,
            refreshToken: ""
        })
        return this.save(userEntity);
    }

    async updateRt(refreshToken: string, login: string): Promise<UserEntity>  {
        const result = await this
            .createQueryBuilder()
            .update({
                refreshToken
            })
            .where({
                login
            })
            .returning('*')
            .execute();
        console.log(result);
        return result.raw[0];
    }

    removeRt(user: UserEntity): Promise<UserEntity> {
        user.refreshToken = '';
        return this.save(user);
    }

}
