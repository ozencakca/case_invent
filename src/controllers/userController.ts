import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { userValidationRules } from '../middlewares/userValidationMiddleware';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { error } = userValidationRules.createUser.validate(req.body);
      if (error) {
        return res.status(422).json({ error: error.details })
      }
      const name: string = req.body.name;
      const user = await this.userService.createUser(name);

      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const { error } = userValidationRules.getUserById.validate(req.params);
      if (error) {
        return res.status(422).json({ error: error.details })
      }
      const user = await this.userService.findUserById(Number(req.params.userId));

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error,
      });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<any> {
    try {
      const users = await this.userService.findAllUsers();
      return res.status(200).json(users);
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async borrowBook(req: Request, res: Response): Promise<Response> {
    try {
      const { error } = userValidationRules.borrowBook.validate(req.params);
      if (error) {
        return res.status(422).json({ error: error.details })
      }
      const userId: number = parseInt(req.params.userId);
      const bookId: number = parseInt(req.params.bookId);
      const book = await this.userService.borrowBook(userId, bookId);

      return res.status(204).json(book);
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async returnBook(req: Request, res: Response): Promise<Response> {
    try {
      const { error: paramError } = userValidationRules.returnBookParams.validate(req.params);
      const { error } = userValidationRules.returnBookBody.validate(req.body);
      if (error || paramError) {
        return res.status(422).json({ error: error?.details || paramError?.details });
      }
      const score = await this.userService.returnBook(Number(req.params.userId), Number(req.params.bookId), Number(req.body.score));

      return res.status(200).json(score);
    }
    catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

}
