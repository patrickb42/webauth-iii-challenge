import db from '../dbConfig';
import { UserCredentials } from '../../types';
import { basicModelTemplate } from './basicModelTemplate';

const model = basicModelTemplate<UserCredentials>({
  tableName: 'user_credentials',
  preprocessData: ({ username, hashedPassword }) => ({
    username,
    hashed_password: hashedPassword,
  }),
  processResult: ({ id, username }) => ({
    id,
    username,
  }),
});

interface GetByUsernameArg {
  username: string,
}

const getByUsername = ({ username }: GetByUsernameArg) => (db('user_credentials')
  .where({ username })
  .first()
  .then((result) => (
    (result)
      ? {
        id: result.id,
        username: result.username,
        hashedPassword: result.hashed_password,
      }
      : undefined
  ))
);

export default {
  get: model.get,
  insert: model.insert,
  getByUsername,
};
