import { Request, Response } from 'express';
import { Session, SessionData } from 'express-session';

interface GQLRequest extends Omit<Request, 'session'> {
  session: Record<string, any> | (Session & Partial<SessionData>);
}

export interface GQLContext {
  req: GQLRequest;
  res: Response;
}
