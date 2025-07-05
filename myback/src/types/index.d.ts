import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  userId?: number; // or string if your user ID is string
}
