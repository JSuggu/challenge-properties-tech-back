import { Injectable } from "@nestjs/common";
import { randomBytes } from "crypto";

@Injectable()
export class SessionsService {
  private activeSessions: Record<string, { userId: number, personId: number, role: string, expiresAt: Date }>;

  constructor(){
    this.activeSessions = {};
  }

  createSession(userId: number, personId: number, role: string): string {
    const token = randomBytes(16).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    this.activeSessions[token] = { userId, personId, role, expiresAt };
    return token;
  }

  validateSession(token: string): {userId: number, personId: number} | null{
    const session = this.activeSessions[token];
    if (!session || session.expiresAt < new Date()) {
      return null;
    }
    return {userId: session.userId, personId: session.personId};
  }

  deleteSession(token: string) {
    delete this.activeSessions[token];
  }
}