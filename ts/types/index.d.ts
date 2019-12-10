import * as Express from 'express';

export interface DecodedToken {
  id: number,
  username: string,
}

export interface JWTRequest extends Express.Request {
  user: {
    username: string,
  },
}

export interface UserCredentials {
  id?: number,
  username?: string,
  hashedPassword?: string,
}

export interface UnknownShape {
  [key: string]: any,
}
