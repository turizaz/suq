import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {AuthModule} from "../auth/auth.module";
import {UserRepository} from "../users/user.repository";
import {UserEntity} from "../users/user.entity";
import {UsersService} from "../users/users.service";
import {AccessTokenDto} from "../auth/auth.dto";

describe('AuthController (e2e)', () => {

  it('/ success sign-it (POST)', async () => {
    await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send({ login: '12345', password: '12345' })
      .expect(200);
    expect(userRepository.findOne).toBeCalledTimes(1);
    expect(userRepository.findOne).toBeCalledWith({login: "12345"})
    jest.clearAllMocks();
  });

  it('/ failed sign-it (POST)', () => {
    request(app.getHttpServer())
        .post('/auth/sign-in')
        .send({ login: '12345', password: '12346' })
        .expect(401);
    jest.clearAllMocks();
  });

  it('/ sign-up (POST)', async () => {

    await request(app.getHttpServer())
        .post('/auth/sign-up')
        .send({ login: '12345', password: '12345' })
        .expect(201)

    expect(userRepository.saveUser).toBeCalledTimes(1);
    expect(userRepository.updateRt).toBeCalledTimes(1);
    jest.clearAllMocks();
  });

  it('/ logout (POST)', async () => {

    const resp = await request(app.getHttpServer())
        .post('/auth/sign-in')
        .send({ login: '12345', password: '12345' })
        .expect(200);
    const tokens: AccessTokenDto = JSON.parse(resp.text);

    expect(tokens.accessToken.length).toBeGreaterThan(10);
    expect(tokens.refreshToken.length).toBeGreaterThan(10);

    await request(app.getHttpServer())
        .post('/auth/logout')
        .set("Authorization", "Bearer "+tokens.accessToken)
        .expect(200);

    await request(app.getHttpServer())
        .post('/auth/logout')
        .expect(401);
    expect(userRepository.findOne).toBeCalledTimes(2);
    expect(userRepository.removeRt).toBeCalledTimes(1);
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

  let app: INestApplication;
  const userEntity = new UserEntity();
  const userService = new UsersService(null);

  const userRepository = {
    saveUser: jest.fn().mockImplementation(() => Promise.resolve(userEntity)),
    findOne: jest.fn().mockImplementation(() => Promise.resolve(userEntity)),
    updateRt: jest.fn().mockImplementation(() => Promise.resolve(userEntity)),
    removeRt:  jest.fn().mockImplementation(() => Promise.resolve(userEntity))
  }
});
