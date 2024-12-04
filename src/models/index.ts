import User from './entities/user';
import Book from './entities/book';
import sequelize from './database';
import ReturnedBook from './entities/returnedBook';

const models = {
  User,
  Book,
  ReturnedBook
};

function isUserModel(model: any): model is typeof User {
  return model === User;
}

function isBookModel(model: any): model is typeof Book {
  return model === Book;
}

function isReturnedBookModel(model: any): model is typeof ReturnedBook {
  return model === ReturnedBook;
}


Object.values(models).forEach((model) => {
  console.log(`Initializing model: ${model.name}`);

  if (isUserModel(model)) {
    model.init(User.getAttributes(), { sequelize });
  } else if (isBookModel(model)) {
    model.init(Book.getAttributes(), { sequelize });
  } else if (isReturnedBookModel(model)) {
    model.init(ReturnedBook.getAttributes(), { sequelize });
  }
});


Object.values(models).forEach((model) => {
    model.associate(models);
});

export { sequelize, User, Book };

export default models;
