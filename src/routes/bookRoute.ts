import { Router } from 'express';
import { BookController } from '../controllers/bookController';
import { BaseRoute } from './baseRoute';
import { Request, Response } from 'express';

export class BookRoute extends BaseRoute {
  private bookController: BookController;
  public router: Router;

  constructor() {
    super();
    this.router = Router();
    this.registerRoutes();
    this.bookController = new BookController();
  }

  protected registerRoutes(): void {
    this.router.post('/',
      this.handleAsync((req: Request, res: Response) =>
        this.bookController.createBook(req, res)
      ));

    this.router.get('/',
      this.handleAsync((req: Request, res: Response) =>
        this.bookController.getAllBooks(req, res)
      ));


    this.router.get('/:bookId',
      this.handleAsync((req: Request, res: Response) =>
        this.bookController.getBookById(req, res)
      ));
  }
}
