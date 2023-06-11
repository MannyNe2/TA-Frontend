import fakeUsers from 'assets/data/fake-users.json';
import { find } from 'lodash-es';

export async function fakeLoginEndpoint({ email, phone, password }) {
  const username = email ?? phone;

  if (!(username && password)) {
    throw new Error('Missing credentials');
  }

  const foundUser = find(
    fakeUsers,
    (user) =>
      (user.email === username || user.phone === username) &&
      user.password === password
  );

  if (foundUser) {
    return {
      accessToken: `fake-token-${
        foundUser.email ? foundUser.email : foundUser.phone
      }`,
      user: foundUser,
      roles: ['user'],
    };
  } else {
    throw new Error('User not found');
  }
}

export async function fakeUserInfoEndpoint({ headers }) {
  if (headers && headers.authorization) {
    const token = headers.authorization.split(' ')[1]; // Format: Bearer <token>
    // Fake verify token
    if (token) {
      const tokenEmailOrPhone = token
        .split('-')
        .slice(2)
        .reduce((prev, curr) => prev + curr, '');
      const foundUser = find(
        fakeUsers,
        (user) => user.email === tokenEmailOrPhone || user.phone === user.phone
      );

      if (foundUser) {
        return foundUser;
      } else {
        throw new Error('User not found');
      }
    } else {
      throw new Error('Authorization missing');
    }
  } else {
    throw new Error('Headers missing');
  }
}
