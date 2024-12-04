import { Transaction } from 'sequelize';

import Book from '../models/entities/book';
import sequelize from '../models/database';

export class BookRepository {

  async createBook(name: string): Promise<Book> {
    return Book.create({ name });
  }

  async borrowBook(userId: number, bookId: number): Promise<Book | null> {
    const result = await sequelize.transaction(async (transaction) => {
      const book = await Book.findByPk(bookId, { transaction });
      if (!book) {
        throw new Error("Book Not Found");
      }

      if (book.currentOwnerId) {
        throw new Error('Book already borrowed cant be borrowed');
      }
      else {
        book.currentOwnerId = userId;
        await book.save({ transaction });
        return book;
      }
    });

    return result;
  }

  async getBookById(bookId: number): Promise<Book | null> {
    return Book.findByPk(bookId);
  }

  async getAllBooks(): Promise<Book[]> {
    return Book.findAll();
  }

  async returnBook(userId: number, bookId: number, score: number, transaction: Transaction): Promise<Book | any> {
    const book = await Book.findByPk(bookId, { transaction });

    if (!book) {
      throw new Error("Book Bot Found");
    }
    if (!book.currentOwnerId) {
      throw new Error('Book Is Not borrowed');
    }

    if (book.currentOwnerId !== userId) {
      throw new Error('Book Not Borrowed By User');
    }

    book.currentOwnerId = null;
    if (book.score === -1) {
      book.score = score;
      book.ownerCount = 1;
    }
    else {
      var totalScore = book.score * book.ownerCount;
      book.ownerCount = book.ownerCount + 1;
      book.score = (totalScore + score) / book.ownerCount;
    }

    await book.save({ transaction });

    return book;
  }
}
