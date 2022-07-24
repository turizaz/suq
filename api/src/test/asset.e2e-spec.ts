import {Test, TestingModule} from "@nestjs/testing";
import {AuthModule} from "../auth/auth.module";
import {UserRepository} from "../users/user.repository";
import {INestApplication} from "@nestjs/common";
import {UserEntity} from "../users/user.entity";
import {UsersService} from "../users/users.service";
import {AssetRepository} from "../asset/asset.repository";
import * as request from "supertest";
import {AccessTokenDto} from "../auth/auth.dto";
import {AssetEntity} from "../asset/asset.entity";
import {AssetModule} from "../asset/asset.module";

describe("Assets controller e2e", () => {
    let app: INestApplication;
    const userEntity = new UserEntity();
    const userPromised = new Promise((res, rej) => {res(userEntity)});
    const userService = new UsersService(null);

    const userRepository = {
        saveUser: () => null,
        findOne: () => null,
        updateRt: () => null,
        removeRt: () => null
    }
    const assetRepository = {
        saveAsset: () => null,
        findOne: () => null
    }

    it("/ should get asset by id  (GET)", async() => {
        const findOneAssetSpy = jest.spyOn(assetRepository, "findOne").mockImplementation(() => new Promise((res, rej) => res(new AssetEntity())));
        const findOneUserSpy = jest.spyOn(userRepository, "findOne").mockImplementation(() => userPromised);

        const resp = await request(app.getHttpServer())
            .post('/auth/sign-in')
            .send({ login: '12345', password: '12345' })
            .expect(200);
        const tokens: AccessTokenDto = JSON.parse(resp.text);

        console.log(tokens.accessToken);
        await request(app.getHttpServer())
            .get('/asset/zalupa')
           // .set("Authorization", "Bearer "+tokens.accessToken)
            .expect(200);

        jest.clearAllMocks();
    })


    beforeEach(async () => {
        userEntity.login = "12345";
        userEntity.password = await userService.hashPassword("12345");

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AssetModule],
        })
            .overrideProvider(AssetRepository)
            .useValue(assetRepository)
            .overrideProvider(UserRepository)
            .useValue(userRepository)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });
})
