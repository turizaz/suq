import {UserRepository} from "../../users/user.repository";
import {UsersService} from "../../users/users.service";
import {UserEntity} from "../../users/user.entity";

describe('User Service Specs', () => {
    const userEntity = new UserEntity();
    it("should save user", async () => {
        const userRepository = new UserRepository();

        const saveUserSpy = jest.spyOn(userRepository, "saveUser").mockImplementation(() => new Promise((res, rej) => {res(userEntity)}));
        const userService = new UsersService(userRepository);
        const res = await userService.save("12345","12345");
        expect(saveUserSpy).toBeCalledTimes(1);
        expect(res).toBe(userEntity);
    })

    it("should hash password", async () => {
        const userRepository = new UserRepository();
        const userService = new UsersService(userRepository);
        const hashedPassword = await userService.hashPassword("12345");
        expect(hashedPassword.length).toBeGreaterThan(10);
    });
})
