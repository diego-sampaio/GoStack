import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

/* 'super' é a classe pai que extendemos: 'Model'. Ele recebe como 1º parâmetro um objeto contendo todos os dados que o usuário pode receber, e, como segundo, o objeto 'sequelize' */
class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
