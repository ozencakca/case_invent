import { SingleUserGetDTO, UserGetDTO } from '../models/dtos/userDTO';
import { UserRepository } from '../repositories/userRepository';
import { BookService } from '../services/bookService';
import { BookDTO } from '../models/dtos/bookDTO';
import { ReturnBookService } from './returnedBookService';
import sequelize from '../models/database';

export class UserService {
  private userRepository: UserRepository;
  private bookService: BookService;
  private ReturnBookService: ReturnBookService;

  constructor() {
    this.userRepository = new UserRepository();
    this.bookService = new BookService();
    this.ReturnBookService = new ReturnBookService();
  }

  async createUser(name: string): Promise<UserGetDTO> {
    const user = await this.userRepository.createUser(name);

    return {
      id: user.id,
      name: user.name,
    };
  }

  async findUserById(id: number): Promise<SingleUserGetDTO | any> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new Error("User Not Found");
    }

    return {
      id: user.id,
      name: user.name,
      present: user?.presentBooks.map((book: any) => ({ name: book.name })),
      past: user?.returnedBooks.map((book: any) => ({ name: book.name, userScore: book.ReturnedBook.userScore })),
    };
  }

  async findAllUsers(): Promise<UserGetDTO[]> {
    const users = await this.userRepository.findAllUsers();

    return users.map((user) => ({
      id: user.id,
      name: user.name,
    }));
  }

  async borrowBook(userId: number, bookId: number): Promise<BookDTO | any> {
    await this.userRepository.findUserById(userId);

    const res = await this.bookService.borrowBook(userId, bookId);
    return res;
  }

  async returnBook(userId: number, bookId: number, score: number): Promise<BookDTO | any> {

    // Start transaction
    const transaction = await sequelize.transaction();
    await this.userRepository.findUserById(userId);
    try {
      const res = await this.bookService.returnBook(userId, bookId, score, transaction);
      await this.ReturnBookService.createReturnedBookForUser(userId, bookId, score, transaction);

      //Commit 
      await transaction.commit();

      return {
        res,
      };
    } catch (error) {
      // Rollback 
      await transaction.rollback();
      throw error;
    }
  }
}
