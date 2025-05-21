import { BadRequestException, Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleAuthService {
  private client: OAuth2Client;
  private clientId = '241747817245-sse3jlcb0cnjhsggg3cnrd1oj5vdiklf.apps.googleusercontent.com';

  constructor() {
    this.client = new OAuth2Client(this.clientId);
  }
  
  async verify(token: string) {
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: this.clientId,
    });

    const payload = ticket.getPayload();
    
    if(!payload) throw new BadRequestException('Invalid token payload');

    return {
      email: payload.email || '',
      name: payload.name  || '',
      picture: payload.picture  || '',
      emailVerified: payload.email_verified  || '',
      sub: payload.sub  || '',
    };
  }
}
