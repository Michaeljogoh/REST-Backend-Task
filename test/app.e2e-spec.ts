import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateUserDto } from './../src/user/dto/create-user.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/user/userId (GET)', async () => {
    const userId = 1;
    return await request(app.getHttpServer())
      .get(`/user/${userId}`)
      .expect(200)
      .expect({
            data: {
              id: 1,
              email: 'george.bluth@reqres.in',
              first_name: 'George',
              last_name: 'Bluth',
              avatar: 'https://reqres.in/img/faces/1-image.jpg'
            },
            support: {
              url: 'https://reqres.in/#support-heading',
              text: 'To keep ReqRes free, contributions towards server costs are appreciated!'
            }
    })
  });


afterAll(async () => {
  await app.close();
});


});
