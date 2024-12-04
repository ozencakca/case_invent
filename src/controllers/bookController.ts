import { Request, Response } from 'express';
import { BookService } from '../services/bookService';
import { bookRequestValidationRules } from '../middlewares/bookValidationMiddleware';

export class BookController {
  private bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  async createBook(req: Request, res: Response): Promise<any> {
    try {
      const { error } = bookRequestValidationRules.createBook.validate(req.body);
      if (error) {
       return res.status(422).json({ error:error.details })
      }
      const book = await this.bookService.createBook(req.body.name);
     return res.status(201).json(book);
    } catch (error) {
     return res.status(500).json({ error });
    }
  }

  async getBookById(req: Request, res: Response): Promise<any> {
    try {
      const { error } = bookRequestValidationRules.getBook.validate(req.params);
      if (error) {
       return res.status(422).json({ error: error.details })
      }
      const book = await this.bookService.getBookById(Number(req.params.bookId));
     return res.status(200).json(book);
    } catch (error) {
     return res.status(500).json({ error });
    }
  }

  async getAllBooks(req: Request, res: Response): Promise<any> {
    try {
      const books = await this.bookService.getAllBooks();
     return res.status(200).json(books);
    } catch (error) {
     return res.status(500).json({ error });
    }
  }
}
