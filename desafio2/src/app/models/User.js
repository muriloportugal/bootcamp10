import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        password_txt: Sequelize.VIRTUAL,
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeSave', async user => {
      if (user.password_txt) {
        user.password_hash = await bcrypt.hash(user.password_txt, 8);
      }
    });
    return this;
  }

  checkPassword(password_txt) {
    return bcrypt.compare(password_txt, this.password_hash);
  }
}

export default User;
