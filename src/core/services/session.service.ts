import { Injectable } from "@nestjs/common";
import { randomBytes } from "crypto";

@Injectable()
export class SessionsService {
  private activeSessions: Record<string, { userId: number; expiresAt: Date }>;

  constructor(){
    this.activeSessions = {};
  }

  createSession(userId: number): string {
    const token = randomBytes(16).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    this.activeSessions[token] = { userId, expiresAt };
    return token;
  }

  validateSession(token: string): number | null {
    const session = this.activeSessions[token];
    if (!session || session.expiresAt < new Date()) {
      return null;
    }
    return session.userId;
  }

  deleteSession(token: string) {
    delete this.activeSessions[token];
  }
}