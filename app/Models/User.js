"use strict";

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use("Hash");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const { v4: uuidv4 } = require('uuid');

class User extends Model {
  static get primaryKey() {
    return "id";
  }

  static get fillable() {
    return ['id', 'firstname', 'lastname', 'email', 'role', 'created_at', 'updated_at'];
  }

  static get hidden() {
    return ['password'];
  }

  static boot() {
    super.boot();


    this.addHook('beforeCreate', async (userInstance) => {
      userInstance.id = uuidv4();
    });

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook("beforeSave", async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });

  }


  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany("App/Models/Token");
  }
}

module.exports = User;
