import { Router, Request, Response, NextFunction } from 'express';

export abstract class BaseRoute {
  public router: Router;
  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  protected abstract registerRoutes(): void;

  protected handleAsync(routeHandler: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
      return routeHandler(req, res, next).catch(next);
    };
  }
}
