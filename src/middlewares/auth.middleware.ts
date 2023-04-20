const config = require('../config/app.config');
import axios, { HttpStatusCode } from 'axios';
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
    Logger.log('[Token Checking]');
    const token = req.headers.authorization;
    if (this.isInvalidToken(token)) {
      Logger.error('[SSO] Unauthorized!')
      res.status(HttpStatusCode.Unauthorized).send('não autorizado');
    }
    else {
      const decodedJwt = jwt.decode(token.split(' ')[1]);
      if (!decodedJwt) {
        Logger.error('[SSO] Unauthorized!')
        res.status(HttpStatusCode.Unauthorized).send('não autorizado');
      }
      else {
        const params = new URLSearchParams({
          client_secret: config.client_secret,
          client_id: decodedJwt.clientId,
          grant_type: 'client_credentials',
          username: "alexsandernolaco@gmail.com",
          password: "YWxleHNhbmRlcm5vbGFjb0BnbWFpbC5jb20="
        });

        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: params.toString(),
          url: config.sso_url
        };

        axios(options)
        .then((response) => {
          Logger.log('[SSO] Result: ' + response.status)
          Logger.log('[SSO] Authorized!')
          next();
        }).catch(err => {
          Logger.error('[SSO] Result: ' + err.response.status)
          if (err.response.status == HttpStatusCode.BadRequest) {
            Logger.error('[SSO] Unauthorized!')
            res.status(HttpStatusCode.Unauthorized).send('não autorizado');
          }
          else {
            Logger.warn('[SSO] Not Available')
            res.status(HttpStatusCode.BadGateway).send('sso indisponível');
          }
        });
      }
    }
  }
}

