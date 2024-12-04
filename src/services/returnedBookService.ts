import { Transaction } from 'sequelize';

import ReturnBook from '../models/entities/returnedBook';
import { ReturnedBookRepository } from '../repositories/returnedBookRepository';


export class ReturnBookService {

  private ReturnedBookRepository: ReturnedBookRepository;

  constructor() {
    this.ReturnedBookRepository = new ReturnedBookRepository();
  }


  async createReturnedBookForUser(userId: number, bookId: number, score: number, transaction: Transaction): Promise<ReturnBook> {
    return this.ReturnedBookRepository.createReturnedBookForUser(userId, bookId, score, transaction);
  }
}