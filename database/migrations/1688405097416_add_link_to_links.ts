import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'links'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('index')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('index')
    })
  }
}
