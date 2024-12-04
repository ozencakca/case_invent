import User from '../models/entities/user';
import Book from '../models/entities/book';

export class UserRepository {

  async createUser(name: string): Promise<User> {
    return User.create({ name });
  }

  async findUserById(userId: number): Promise<User | any> {
    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          model: Book,
          as: 'returnedBooks',
          through: {
            attributes: ['userScore']

          },
          required: false,
        },
        {
          model: Book,
          as: 'presentBooks',
          required: false,
        },
      ],
    });
    if (!user) {
      throw new Error("User Not Found");
    }

    return user;
  }

  async findAllUsers(): Promise<User[]> {
    return User.findAll();
  }
}
