import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import Book from '../../models/entities/book';

class User extends Model {
  public id!: number;
  public name!: string;
  public presentBooks!: Book[];
  public returnedBooks!: Book[];

  static associate(models: any) {
    this.hasMany(
      models.Book,
      {
        foreignKey: 'currentOwnerId',
        as: 'presentBooks',
      });
    this.belongsToMany(
      models.Book,
      {
        through: models.ReturnedBook,
        foreignKey: 'userId',
        otherKey: 'bookId',
        as: 'returnedBooks',
      });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
  }
);

export default User;
