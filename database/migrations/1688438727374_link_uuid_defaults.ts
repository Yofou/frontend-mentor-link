import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'links'

  public async up() {
    this.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    this.schema.dropTable(this.tableName)
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.integer('index')
      table.string('platform')
      table.string('platformId')
      table.string('url')
      table.integer('userId').unsigned().references('users.id').onDelete('CASCADE')

      /**
       *
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
