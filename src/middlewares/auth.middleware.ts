const config = require('../config/app.config');
import axios, { HttpStatusCode } from 'axios';
import * as jwt from 'jsonwebtoken';
import { NestMiddleware, Injectable, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    Logger.log('Token Checking', 'SSO');
    const token = req.headers.authorization;
    if (this.isInvalidToken(token)) {
      Logger.error('Unauthorized!', 'SSO');
      return this.notAuthorizedMessage(res);
    }
    else {
      const decodedJwt = jwt.decode(token.split(' ')[1]);
      if (!decodedJwt) {
        Logger.error('Unauthorized!', 'SSO');
        return this.notAuthorizedMessage(res);
      }
      else {
        const params = new URLSearchParams({
          client_secret: config.client_secret,
          client_id: decodedJwt.clientId,
          grant_type: 'client_credentials',
          username: config.api_user_email, 
          password: config.api_password 
        });

        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: params.toString(),
          url: config.sso_url
        };

        axios(options)
        .then((response) => {
          Logger.log('Result: ' + response.status, 'SSO')
          Logger.log('Authorized!', 'SSO')
          next();
        }).catch(err => {
          Logger.error('Result: ' + err.response.status, 'SSO')
          if (err.response.status == HttpStatusCode.BadRequest) {
            Logger.error('Unauthorized!', 'SSO')
            return this.notAuthorizedMessage(res);
          }
          else {
            Logger.warn('Not Available', 'SSO')
            return res.status(HttpStatusCode.BadGateway).json({
              "statusCode": HttpStatusCode.BadGateway,
              "message": "sso indisponível",
              "error": "Bad Gateway"
            });
          }
        });
      }
    }
  }

  isInvalidToken(token): boolean {
    return !token
      || token.split(' ').length !== 2
      || token.split(' ')[0] !== 'Bearer';
  }

  notAuthorizedMessage(res) {
    return res.status(HttpStatusCode.Unauthorized).json({
      "statusCode": HttpStatusCode.Unauthorized,
      "message": "não autorizado",
      "error": "Unauthorized"
    });
  }
}

