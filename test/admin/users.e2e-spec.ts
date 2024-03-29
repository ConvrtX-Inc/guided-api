import { APP_URL, ADMIN_EMAIL, ADMIN_PASSWORD } from '../utils/constants';
import * as request from 'supertest';

describe('Users admin (e2e)', () => {
  const app = APP_URL;
  let newUserFirst;
  const newUserEmailFirst = `user-first.${Date.now()}@example.com`;
  const newUserPasswordFirst = `secret`;
  const newUserChangedPasswordFirst = `new-secret`;
  const newUserByAdminEmailFirst = `user-created-by-admin.${Date.now()}@example.com`;
  const newUserByAdminPasswordFirst = `secret`;
  let apiToken;

  beforeAll(async () => {
    await request(app)
      .post('/api/v1/auth/admin/email/login')
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
      .then(({ body }) => {
        apiToken = body.token;
      });

    await request(app)
      .post('/api/v1/auth/email/register')
      .send({
        email: newUserEmailFirst,
        password: newUserPasswordFirst,
        firstName: `First${Date.now()}`,
        lastName: 'E2E',
      });

    await request(app)
      .post('/api/v1/auth/email/login')
      .send({ email: newUserEmailFirst, password: newUserPasswordFirst })
      .then(({ body }) => {
        newUserFirst = body.user;
      });
  });

  it('Change password for new user: /api/v1/users/:id (PATCH)', () => {
    return request(app)
      .patch(`/api/v1/users/${newUserFirst.id}`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .send({ password: newUserChangedPasswordFirst })
      .expect(200);
  });

  it('Change phone no for new user: /api/v1/users/updatePhoneNo (POST)', () => {
    return request(app)
      .patch(`/api/v1/users/updatePhoneNo`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .send({ id: newUserFirst.id, phone_no: 63917000123678 })
      .expect(200);
  });

  it('Login via registered user: /api/v1/auth/email/login (GET)', () => {
    return request(app)
      .post('/api/v1/auth/email/login')
      .send({ email: newUserEmailFirst, password: newUserChangedPasswordFirst })
      .expect(200)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
      });
  });

  it('Fail create new user by admin: /api/v1/users (POST)', () => {
    return request(app)
      .post(`/api/v1/users`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .send({ email: 'fail-data' })
      .expect(422);
  });

  it('Success create new user by admin: /api/v1/users (POST)', () => {
    return request(app)
      .post(`/api/v1/users`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .send({
        email: newUserByAdminEmailFirst,
        password: newUserByAdminPasswordFirst,
        firstName: `UserByAdmin${Date.now()}`,
        lastName: 'E2E',
      })
      .expect(201);
  });

  it('Login via created by admin user: /api/v1/auth/email/login (GET)', () => {
    return request(app)
      .post('/api/v1/auth/email/login')
      .send({
        email: newUserByAdminEmailFirst,
        password: newUserByAdminPasswordFirst,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
      });
  });
});
