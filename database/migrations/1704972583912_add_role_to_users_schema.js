'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddRoleToUsersSchema extends Schema {
  up () {
    this.create('add_role_to_users', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('add_role_to_users')
  }
}

module.exports = AddRoleToUsersSchema
