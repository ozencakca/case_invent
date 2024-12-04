import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

class ReturnedBook extends Model {
  public userId!: number;
  public bookId!: number;
  public userScore!: number;

  static associate(models: any) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    this.belongsTo(models.Book, { foreignKey: 'bookId', as: 'book' });
  }
}

ReturnedBook.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    bookId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'books',
        key: 'id',
      },
    },
    userScore: {
      type: DataTypes.INTEGER,
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
    modelName: 'ReturnedBook',
    tableName: 'ReturnedBooks',
    timestamps: false,
  }
);

export default ReturnedBook;
