/* commented code is for express sessions */
import * as Express from 'express';
import * as Jwt from 'jsonwebtoken';

import { DecodedToken, JWTRequest } from '../types';

// export const verifyLoggedIn = (
//   req: Express.Request,
//   res: Express.Response,
//   next: Express.NextFunction,
// ) => (
//   (req.session?.user)
//     ? next()
//     : res.status(401).json({ message: 'no user logged in' })
// );

export const verifyLoggedIn = (
  req: JWTRequest,
  res: Express.Response,
  next: Express.NextFunction,
) => {
  const { token } = req.headers;

  return ((token === undefined || typeof token !== 'string')
    ? res.status(401).json({ message: 'token not valid' })
    : Jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken: DecodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'token not valid' });
      }
      req.user = { username: decodedToken.username };
      return next();
    })
  );
};

export default {};
