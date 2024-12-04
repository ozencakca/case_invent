import ReturnedBook from '../models/entities/returnedBook';
import { Transaction } from 'sequelize';

export class ReturnedBookRepository {

  async createReturnedBookForUser(userId: number, bookId: number, score: number, transaction: Transaction): Promise<ReturnedBook> {
    return await ReturnedBook.create({ userId: userId, bookId: bookId, userScore: score }, { transaction });

  }
}