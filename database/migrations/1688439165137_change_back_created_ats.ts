import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'links'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('created_at', 'createdAt')
      table.renameColumn('updated_at', 'updatedAt')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('createdAt', 'created_at')
      table.renameColumn('updatedAt', 'updated_at')
    })
  }
}
