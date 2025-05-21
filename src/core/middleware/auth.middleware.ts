import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { SessionsService } from "../services/session.service";
import { NextFunction } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private sessionsService: SessionsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new UnauthorizedException('Token no proporcionado');

    const token: string = authHeader.split(' ')[1];
    if (!token) throw new UnauthorizedException('Formato de token inválido');

    const userId = this.sessionsService.validateSession(token);
    if (!userId) throw new UnauthorizedException('Token inválido o expirado');

    (req as any).user = { id: userId };
    next();
  }
}