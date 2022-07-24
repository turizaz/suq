import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import {AuthModule} from "../auth/auth.module";
import {UserRepository} from "../users/user.repository";
import {UserEntity} from "../users/user.entity";
import {UsersService} from "../users/users.service";
import {AccessTokenDto} from "../auth/auth.dto";

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  const userEntity = new UserEntity();
  const userService = new UsersService(null);
  const userPromised = new Promise((res, rej) => {res(userEntity)});

  const userRepository = {
    saveUser: () => null,
    findOne: () => null,
    updateRt: () => null,
    removeRt: () => null
  }

  it('/ success sign-it (POST)', async () => {
    const findOneSpy = jest.spyOn(userRepository, "findOne").mockImplementation(() => userPromised);
    await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send({ login: '12345', password: '12345' })
      .expect(200);
    expect(findOneSpy).toBeCalledTimes(1);
    expect(findOneSpy).toBeCalledWith({login: "12345"})
    jest.clearAllMocks();
    return;
  });

  it('/ failed sign-it (POST)', () => {
    request(app.getHttpServer())
        .post('/auth/sign-in')
        .send({ login: '12345', password: '12346' })
        .expect(401);
    jest.clearAllMocks();
  });

  it('/ sign-up (POST)', async () => {
    const saveUserSpy = jest.spyOn(userRepository, "saveUser").mockImplementation(() => userPromised);
    const updateRtSpy = jest.spyOn(userRepository, "updateRt").mockImplementation(() => userPromised);
    await request(app.getHttpServer())
        .post('/auth/sign-up')
        .send({ login: '12345', password: '12345' })
        .expect(201)

    expect(saveUserSpy).toBeCalledTimes(1);
    expect(updateRtSpy).toBeCalledTimes(1);
    jest.clearAllMocks();
  });

  it('/ logout (POST)', async () => {
    const removeRtSpy = jest.spyOn(userRepository, "removeRt").mockImplementation(() => userPromised);
    const findOneSpy = jest.spyOn(userRepository, "findOne").mockImplementation(() => userPromised);
    const resp = await request(app.getHttpServer())
        .post('/auth/sign-in')
        .send({ login: '12345', password: '12345' })
        .expect(200);
    const tokens: AccessTokenDto = JSON.parse(resp.text);

    await request(app.getHttpServer())
        .post('/auth/logout')
        .set("Authorization", "Bearer "+tokens.accessToken)
        .expect(200);

    await request(app.getHttpServer())
        .post('/auth/logout')
        .expect(401);
    expect(findOneSpy).toBeCalledTimes(2);
    expect(removeRtSpy).toBeCalledTimes(1);
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    userEntity.login = "12345";
    userEntity.password = await userService.hashPassword("12345");
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    })
        .overrideProvider(UserRepository)
        .useValue(userRepository)
        .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
});
