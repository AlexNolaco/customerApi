const config = require('../config/app.config');
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import { NestMiddleware, Injectable, ForbiddenException, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { decode } from 'punycode';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  isInvalidToken(token): boolean {
    return !token
      || token.split(' ').length !== 2
      || token.split(' ')[0] !== 'Bearer';
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (this.isInvalidToken(token)) {

      Logger.log(this.isInvalidToken(token))
      res.status(401).send('não autorizado');
    }
    else {
      const decodedJwt = jwt.decode(token.split(' ')[1]);
      Logger.log(decodedJwt.clientId);


      const data = {
        "client_secret": config.client_secret,
        "client_id": decodedJwt.clientId,
        "grant_type": "client_credentials",
        "username": "alex",
        "password": "YWxleHNhbmRlcm5vbGFjb0BnbWFpbC5jb20="
      };
      axios.post(config.sso_url, data)
      .then(response => Logger.log(response));

     

    Logger.log(res);
 
      next();
    }
  }

}