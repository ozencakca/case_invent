import { BookDTO } from '../models/dtos/bookDTO';
import { BookRepository } from '../repositories/bookRepository';
import { Transaction } from 'sequelize';

export class BookService {
  private bookRepository: BookRepository;

  constructor() {
    this.bookRepository = new BookRepository();
  }

  async createBook(name: string): Promise<BookDTO> {
    const book = await this.bookRepository.createBook(name);

    return {
      id: book.id,
      name: book.name
    };
  }

  async borrowBook(userId: number, bookId: number): Promise<BookDTO | any> {
    const book = await this.bookRepository.borrowBook(userId, bookId);
    if (!book) {
      throw new Error("Book Cannot Borrowed");
    }

    return {
      id: book.id,
      name: book.name
    };
  }

  async getBookById(bookId: number): Promise<BookDTO | any> {
    const book = await this.bookRepository.getBookById(bookId);
    if (!book) {
      throw new Error("Book Not Found");

    }

    return {
      id: book.id,
      name: book.name,
      score: book.score,
    };
  }

  async getAllBooks(): Promise<BookDTO[]> {
    const books = await this.bookRepository.getAllBooks();

    return books.map((book) => ({
      id: book.id,
      name: book.name,
    }));
  }

  async returnBook(userId: number, bookId: number, score: number, transaction: Transaction): Promise<BookDTO | any> {
    const book = await this.bookRepository.returnBook(userId, bookId, score, transaction);

    return {
      id: book.id,
      name: book.name,
    };
  }
}
